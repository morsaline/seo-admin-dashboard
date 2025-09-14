"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Upload, Plus, X, ArrowLeft } from "lucide-react";
import { Hotel, Room } from "@/app/(DashboardLayout)/dashboard/hotels/page";
import {
  useCrateMultipleUploadFileMutation,
  useCrateSingleUploadFileMutation,
} from "@/redux/features/image/imageApi";
import Image from "next/image";

interface HotelFormProps {
  hotel?: Hotel;
  onSubmit: (hotel: Hotel | Omit<Hotel, "id">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function HotelForm({
  hotel,
  onSubmit,
  onCancel,
  isEditing = false,
}: HotelFormProps) {
  const [formData, setFormData] = useState({
    name: hotel?.name || "",
    address: hotel?.address || "",
    whatsapp: hotel?.whatsapp || "",
    instagram: hotel?.instagram || "",
    phone: hotel?.phone || "",
    description: hotel?.description || "",
    productImage: hotel?.productImage || "",
  });

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
        roomPictures: [],
      },
    ]
  );

  const [crateSingleUploadFile] = useCrateSingleUploadFileMutation();
  const [crateMultipleUploadFile] = useCrateMultipleUploadFileMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoomChange = (index: number, field: string, value: string) => {
    setRooms((prev) =>
      prev.map((room, i) => (i === index ? { ...room, [field]: value } : room))
    );
  };

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
        roomPictures: [],
      },
    ]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      try {
        const productImageStr = await crateSingleUploadFile(
          formDataUpload
        ).unwrap();
        setFormData((prev) => ({ ...prev, productImage: productImageStr }));
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const openFileDialog = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleRoomFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    roomIndex: number
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // Show local previews first
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? { ...room, roomPictures: [...room.roomPictures, ...previewUrls] }
          : room
      )
    );

    // Prepare FormData for multiple files
    const formDataUpload = new FormData();
    files.forEach((file) => formDataUpload.append("images", file));

    try {
      // Upload all files at once
      const uploadedImages: string[] = await crateMultipleUploadFile(
        formDataUpload
      ).unwrap();

      // Set roomPictures to uploaded image URLs (replace previews)
      setRooms((prev) =>
        prev.map((room, i) =>
          i === roomIndex
            ? {
                ...room,
                roomPictures: [...room.roomPictures, ...uploadedImages],
              }
            : room
        )
      );

      console.log("Uploaded images:", uploadedImages);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const openRoomFileDialog = (index: number) => {
    document.getElementById(`room-upload-${index}`)?.click();
  };

  const removeRoomImage = (roomIndex: number, imgUrl: string) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              roomPictures: room.roomPictures.filter((img) => img !== imgUrl),
            }
          : room
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hotelData = {
      ...formData,
      rooms,
      ...(isEditing && hotel ? { id: hotel.id } : {}),
    };
    onSubmit(hotelData as Hotel);
  };

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onCancel}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Hotels List
          </h1>
          {!isEditing && (
            <h2 className="text-lg font-semibold text-primary mb-4">
              Add Hotels
            </h2>
          )}
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
                  WhatsApp*
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    handleInputChange("whatsapp", e.target.value)
                  }
                  placeholder="Enter WhatsApp number"
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
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Add description"
                rows={4}
                required
              />
            </div>

            {/* Product Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Image*</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {formData.productImage ? (
                  <Image
                    src={formData.productImage}
                    alt="Product"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg object-cover mb-4"
                    unoptimized
                  />
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop file or browse
                    </p>
                  </>
                )}
                <Button
                  type="button"
                  variant="default"
                  className="text-white hover:bg-primary/90"
                  onClick={openFileDialog}
                >
                  Browse Files
                </Button>

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Room Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Add Room</h3>
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="p-4 border rounded-lg mb-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Room Name*</h4>
                    {rooms.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRoom(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Room name"
                      value={room.name}
                      onChange={(e) =>
                        handleRoomChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <Input
                      placeholder="Beds"
                      value={room.beds}
                      onChange={(e) =>
                        handleRoomChange(index, "beds", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Washroom"
                      value={room.washroom}
                      onChange={(e) =>
                        handleRoomChange(index, "washroom", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Parking"
                      value={room.parking}
                      onChange={(e) =>
                        handleRoomChange(index, "parking", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Gym"
                      value={room.gym}
                      onChange={(e) =>
                        handleRoomChange(index, "gym", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Swimming"
                      value={room.swimming}
                      onChange={(e) =>
                        handleRoomChange(index, "swimming", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Wifi"
                      value={room.wifi}
                      onChange={(e) =>
                        handleRoomChange(index, "wifi", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Breakfast"
                      value={room.breakfast}
                      onChange={(e) =>
                        handleRoomChange(index, "breakfast", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Room Pictures</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {room.roomPictures.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                          {room.roomPictures.map((src, idx) => (
                            <div key={idx} className="relative w-full h-32">
                              <Image
                                src={src}
                                alt={`Room ${index + 1} - ${idx + 1}`}
                                fill
                                className="rounded-lg object-cover"
                                unoptimized
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                                onClick={() => removeRoomImage(index, src)}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drop files or browse
                          </p>
                        </>
                      )}

                      <Button
                        type="button"
                        variant="default"
                        className="text-white hover:bg-primary/90 mt-2"
                        onClick={() => openRoomFileDialog(index)}
                      >
                        Browse Files
                      </Button>

                      <input
                        id={`room-upload-${index}`}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleRoomFileChange(e, index)}
                      />
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
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={onCancel}
                  className="px-6"
                >
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
  );
}
