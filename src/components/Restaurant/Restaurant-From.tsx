"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Upload, Plus, X, ArrowLeft } from "lucide-react";
import {
  MenuItem,
  Restaurant,
} from "@/app/(DashboardLayout)/dashboard/restaurants/page";

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSubmit: (restaurant: Restaurant | Omit<Restaurant, "id">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function RestaurantForm({
  restaurant,
  onSubmit,
  onCancel,
  isEditing = false,
}: RestaurantFormProps) {
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    address: restaurant?.address || "",
    whatsapp: restaurant?.whatsapp || "",
    instagram: restaurant?.instagram || "",
    description: restaurant?.description || "",
    productImage: restaurant?.productImage || "",
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    restaurant?.menuItems || [
      {
        id: "1",
        name: "",
        itemG1: "",
        itemG2: "",
        itemG3: "",
        price: "",
        picture: "",
      },
    ]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMenuItemChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setMenuItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addMenuItem = () => {
    setMenuItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        itemG1: "",
        itemG2: "",
        itemG3: "",
        price: "",
        picture: "",
      },
    ]);
  };

  const removeMenuItem = (index: number) => {
    if (menuItems.length > 1) {
      setMenuItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const restaurantData = {
      ...formData,
      menuItems,
      ...(isEditing && restaurant ? { id: restaurant.id } : {}),
    };
    onSubmit(restaurantData as Restaurant);
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
            {" "}
            <ArrowLeft className="h-5 w-5" />{" "}
          </Button>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Restaurants List
          </h1>
          {!isEditing && (
            <h2 className="text-lg font-semibold text-primary mb-4">
              Add Restaurants
            </h2>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Restaurant Name*
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
                  placeholder="Enter Instagram account"
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Add description"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Image*</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop file or browse
                </p>
                <Button
                  variant={"default"}
                  className=" text-white hover:bg-primary/90"
                >
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Menu Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Add Menu</h3>
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg mb-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Menu Item {index + 1}</h4>
                    {menuItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Food name*"
                      value={item.name}
                      onChange={(e) =>
                        handleMenuItemChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <Input
                      placeholder="Item 01*"
                      value={item.itemG1}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG1", e.target.value)
                      }
                      required
                    />
                    <Input
                      placeholder="Item 02"
                      value={item.itemG2}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG2", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Item 03"
                      value={item.itemG3}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG3", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Price*"
                      value={item.price}
                      onChange={(e) =>
                        handleMenuItemChange(index, "price", e.target.value)
                      }
                      required
                    />
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop file or browse
                      </p>
                      <Button
                        variant={"default"}
                        className=" text-white hover:bg-primary/90"
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More button - no longer full width */}
              <Button
                type="button"
                variant={"ghost"}                onClick={addMenuItem}
              >
                <Plus className="h-4 w-4" /> Add More
              </Button>
            </div>

            {/* Submit & Cancel */}
            <div className="flex gap-4 pt-6 justify-around">
              {" "}
              {isEditing && (
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={onCancel}
                  className="px-6"
                >
                  {" "}
                  Cancel{" "}
                </Button>
              )}{" "}
              <Button
			  variant={"default"}
                type="submit"
              >
                {" "}
                {isEditing ? "Update" : "Submit"}{" "}
              </Button>{" "}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
