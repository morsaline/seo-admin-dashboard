"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fashion } from "./Fashion-List";
import { UploadCloud } from "lucide-react";

interface FashionFormProps {
  fashion?: Fashion;
  onSubmit: (service: Omit<Fashion, "id"> & { id?: string }) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export function FashionForm({
  fashion,
  onSubmit,
  onCancel,
  isEdit = false,
}: FashionFormProps) {
  const [formData, setFormData] = useState({
    storeName: fashion?.storeName || "",
    address: fashion?.address || "",
    image: fashion?.image || "",
    review: fashion?.review || 5,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    onSubmit(formData);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-1">
            {isEdit ? "Edit Service" : "Add Service"}
          </p>
          <h1 className="text-xl font-semibold text-orange-500">
            {isEdit ? "Edit Service" : "Add Service"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full  rounded-xl  space-y-6">
          {/* Store Name */}
          <div>
            <label className="block mb-1 font-medium">Store Name</label>
            <Input
              placeholder="Enter name"
              value={formData.storeName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, storeName: e.target.value }))
              }
            />
          </div>

          {/* Review */}
          <div>
            <label className="block mb-1 font-medium">Review</label>
            <div className="flex gap-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <label
                  key={star}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="review"
                    value={star}
                    checked={formData.review === star}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, review: star }))
                    }
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center 
            ${
              formData.review === star
                ? "bg-orange-500 border-orange-500"
                : "border-orange-500"
            }
          `}
                  />
                  {star} Star
                </label>
              ))}
            </div>
          </div>
          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <Input
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Add Image</label>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Drop file or browse</p>
              <p className="text-xs text-gray-400">
                Format: .jpeg, .png, .mp4 & Max file size: 25MB
              </p>

              <label
                htmlFor="file-upload"
                className="mt-3 cursor-pointer rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Browse Files
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".jpeg,.jpg,.png,.mp4"
                className="hidden"
                onChange={handleFileChange}
              />
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  Selected:{" "}
                  {typeof formData.image === "string"
                    ? formData.image
                    : formData.image.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-8 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              {isEdit ? "Done" : "Upload"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
