"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Upload, Plus, X, ArrowLeft } from "lucide-react"
import { Hotel, Room } from "@/app/(DashboardLayout)/dashboard/hotels/page"


interface HotelFormProps {
  hotel?: Hotel
  onSubmit: (hotel: Hotel | Omit<Hotel, "id">) => void
  onCancel: () => void
  isEditing?: boolean
}

export function HotelForm({ hotel, onSubmit, onCancel, isEditing = false }: HotelFormProps) {
  const [formData, setFormData] = useState({
    name: hotel?.name || "",
    address: hotel?.address || "",
    whatsapp: hotel?.whatsapp || "",
    instagram: hotel?.instagram || "",
    phone: hotel?.phone || "",
    description: hotel?.description || "",
    productImage: hotel?.productImage || "",
  })

  const [rooms, setRooms] = useState<Room[]>(
    hotel?.rooms || [
      {
        id: "1",
        name: "",
        beds: "",
        washroom: "",
        parking: "",
        gym: "",
        swimming: "",
        wifi: "",
        breakfast: "",
        picture: "",
      },
    ],
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRoomChange = (index: number, field: string, value: string) => {
    setRooms((prev) => prev.map((room, i) => (i === index ? { ...room, [field]: value } : room)))
  }

  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        beds: "",
        washroom: "",
        parking: "",
        gym: "",
        swimming: "",
        wifi: "",
        breakfast: "",
        picture: "",
      },
    ])
  }

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const hotelData = {
      ...formData,
      rooms,
      ...(isEditing && hotel ? { id: hotel.id } : {}),
    }
    onSubmit(hotelData as Hotel)
  }

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={onCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground mb-4">Hotels List</h1>
          {!isEditing && <h2 className="text-lg font-semibold text-primary mb-4">Add Hotels</h2>}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hotel Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Restaurant and Hotel Name*
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address*
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium">
                  What&apos;s app*
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  placeholder="Enter what's app number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm font-medium">
                  Instagram*
                </Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="Enter Instagram account name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone*
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description*
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add description"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Image*</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drop file or browse</p>
                <Button variant={"default"} className=" text-white hover:bg-primary/90">
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Room Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Add Room</h3>
              {rooms.map((room, index) => (
                <div key={room.id} className="p-4 border rounded-lg mb-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Room Name*</h4>
                    {rooms.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeRoom(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Room name"
                      value={room.name}
                      onChange={(e) => handleRoomChange(index, "name", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Beds"
                      value={room.beds}
                      onChange={(e) => handleRoomChange(index, "beds", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Washroom"
                      value={room.washroom}
                      onChange={(e) => handleRoomChange(index, "washroom", e.target.value)}
                    />
                    <Input
                      placeholder="Parking"
                      value={room.parking}
                      onChange={(e) => handleRoomChange(index, "parking", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Gym"
                      value={room.gym}
                      onChange={(e) => handleRoomChange(index, "gym", e.target.value)}
                    />
                    <Input
                      placeholder="Swimming"
                      value={room.swimming}
                      onChange={(e) => handleRoomChange(index, "swimming", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Wifi"
                      value={room.wifi}
                      onChange={(e) => handleRoomChange(index, "wifi", e.target.value)}
                    />
                    <Input
                      placeholder="Breakfast"
                      value={room.breakfast}
                      onChange={(e) => handleRoomChange(index, "breakfast", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Room Picture</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drop file or browse</p>
                      <Button variant={"default"} className=" text-white hover:bg-primary/90">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant={"ghost"} onClick={addRoom}>
                <Plus className="h-4 w-4" /> Add More
              </Button>
            </div>

            {/* Submit & Cancel */}
            <div className="flex gap-4 pt-6 justify-around">
              {isEditing && (
                <Button type="button" variant={"ghost"} onClick={onCancel} className="px-6">
                  Cancel
                </Button>
              )}
              <Button variant={"default"} type="submit">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
