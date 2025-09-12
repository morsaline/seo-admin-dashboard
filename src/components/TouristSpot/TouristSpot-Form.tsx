"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Upload, Plus, X, ArrowLeft } from "lucide-react"
import type { TouristSpot } from "./TouristSpot-List"

interface TouristSpotFormProps {
  touristSpot?: TouristSpot
  onSubmit: (spot: TouristSpot | Omit<TouristSpot, "id">) => void
  onCancel: () => void
  isEditing?: boolean
}

export function TouristSpotForm({ touristSpot, onSubmit, onCancel, isEditing = false }: TouristSpotFormProps) {
  const [formData, setFormData] = useState({
    name: touristSpot?.name || "",
    address: touristSpot?.address || "",
    phone: touristSpot?.phone || "",
    description: touristSpot?.description || "",
    youtubeLink: touristSpot?.youtubeLink || "",
  })

  const [facilities, setFacilities] = useState<string[]>(touristSpot?.facilities || [""])
  const [culture, setCulture] = useState<string[]>(touristSpot?.culture || [""])
  const [photos, setPhotos] = useState<string[]>(touristSpot?.photos || [])
  const [videos, setVideos] = useState<string[]>(touristSpot?.videos || [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => {
    const newArray = [...array]
    newArray[index] = value
    setArray(newArray)
  }

  const addArrayItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    setArray([...array, ""])
  }

  const removeArrayItem = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    if (array.length > 1) {
      setArray(array.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const spotData = {
      ...formData,
      facilities: facilities.filter((f) => f.trim() !== ""),
      culture: culture.filter((c) => c.trim() !== ""),
      photos,
      videos,
      ...(isEditing && touristSpot ? { id: touristSpot.id } : {}),
    }
    onSubmit(spotData as TouristSpot)
  }

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={onCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground mb-4">Tourist Spot List</h1>
          {!isEditing && <h2 className="text-lg font-semibold text-primary mb-4">Add Tourist Spot</h2>}
          {isEditing && <h2 className="text-lg font-semibold text-primary mb-4">Edit Tourist Spot</h2>}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Tourist Spot Name*
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

            {/* Facilities Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Facilities</Label>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Add Facilities</Label>
                {facilities.map((facility, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Add description"
                      value={facility}
                      onChange={(e) => handleArrayChange(facilities, setFacilities, index, e.target.value)}
                    />
                    {facilities.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(facilities, setFacilities, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => addArrayItem(facilities, setFacilities)}
                  className="text-orange-500 border border-orange-500 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More
                </Button>
              </div>
            </div>

            {/* Culture Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Culture</Label>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Add Culture</Label>
                {culture.map((cultureItem, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Add description"
                      value={cultureItem}
                      onChange={(e) => handleArrayChange(culture, setCulture, index, e.target.value)}
                    />
                    {culture.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(culture, setCulture, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => addArrayItem(culture, setCulture)}
                  className="text-orange-500 border border-orange-500 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More
                </Button>
              </div>
            </div>

            {/* YouTube Video Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">YouTube video link</Label>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Add youtube video link</Label>
                <Input
                  placeholder="Add video link"
                  value={formData.youtubeLink}
                  onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-orange-500 border border-orange-500 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More
                </Button>
              </div>
            </div>

            {/* Add Photo */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Add Photo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drop file or browse</p>
                <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Add Video */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Add Video</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drop file or browse</p>
                <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Submit & Cancel */}
            <div className="flex gap-4 pt-6 justify-center">
              {isEditing && (
                <Button type="button" variant="ghost" onClick={onCancel} className="px-8 text-orange-500">
                  Cancel
                </Button>
              )}
              <Button variant="default" type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                {isEditing ? "Done" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
