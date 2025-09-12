"use client";

import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TouristSpot } from "./TouristSpot-List";
import Image from "next/image";

interface TouristSpotModalProps {
  touristSpot: TouristSpot;
  isOpen: boolean;
  onClose: () => void;
}

export function TouristSpotModal({
  touristSpot,
  isOpen,
  onClose,
}: TouristSpotModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Top Section: Hero + Description side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-6">
          {/* Hero Image */}
          <div className="relative h-72 md:h-full">
            <Image
              src="/beautiful-tourist-destination-landscape.png"
              alt={touristSpot.name}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Play className="h-4 w-4" />
              <span>{touristSpot.name}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 text-sm text-gray-700 leading-relaxed">
            <p className="mb-4">{touristSpot.description}</p>

            <div className="space-y-1">
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {touristSpot.address}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {touristSpot.phone}
              </p>
            </div>

            {touristSpot.facilities?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold text-sm mb-1">Facilities:</h3>
                <ul className="list-disc list-inside space-y-0.5">
                  {touristSpot.facilities.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {touristSpot.culture?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold text-sm mb-1">Culture:</h3>
                <ul className="list-disc list-inside space-y-0.5">
                  {touristSpot.culture.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Photos Section */}
        <div className="p-6">
          <h3 className="font-semibold mb-3">Photos</h3>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
              >
                <Image
                  src={`/tourist-destination-photo-.png?query=tourist destination photo ${i}`}
                  alt={`${touristSpot.name} photo ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="p-6">
          <h3 className="font-semibold mb-3">Videos</h3>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative w-40 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
              >
                <Image
                  src={`/video-thumbnail-concept.png?query=video thumbnail ${i}`}
                  alt={`Video ${i}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-orange-500 rounded-full p-2 group-hover:bg-orange-600 transition-colors">
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
