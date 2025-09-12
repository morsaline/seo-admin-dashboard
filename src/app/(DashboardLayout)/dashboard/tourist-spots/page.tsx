"use client"

import { TouristSpotForm } from "@/components/TouristSpot/TouristSpot-Form"
import { TouristSpot, TouristSpotList } from "@/components/TouristSpot/TouristSpot-List"
import { TouristSpotModal } from "@/components/TouristSpot/TouristSpot-Modal"
import { useState } from "react"


// Sample data matching the images
const sampleTouristSpots: TouristSpot[] = [
  {
    id: "1",
    name: "Buzios Sea Beach",
    address: "Armação dos Búzios, Rio de Janeiro, Brazil",
    phone: "+55 22 99999-0000",
    description:
      "Buzios is a charming Brazilian coastal town known for its golden beaches, vibrant nightlife, and cultural richness. Visitors enjoy water sports, boat tours, and a relaxed beach atmosphere.",
    facilities: [
      "Beautiful beach access",
      "Water sports equipment",
      "Beachfront restaurants",
      "Nightlife spots",
    ],
    culture: [
      "Samba dance shows",
      "Local art exhibitions",
      "Handicraft markets",
    ],
    youtubeLink: "https://www.youtube.com/watch?v=0fKc4XU9-84",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    ],
    videos: [
      "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    ],
  },
  {
    id: "2",
    name: "Bali Beach Paradise",
    address: "Kuta, Bali, Indonesia",
    phone: "+62 361 123456",
    description:
      "Bali is one of the world's most popular island destinations, famous for its lush rice terraces, beaches, temples, and nightlife. It's the perfect mix of relaxation and adventure.",
    facilities: ["Beach access", "Spa and wellness centers", "Surf rentals", "Yoga retreats"],
    culture: ["Balinese dance performances", "Traditional ceremonies", "Local cuisine"],
    youtubeLink: "https://www.youtube.com/watch?v=4WtSd5xLQJY",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    ],
    videos: [
      "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    ],
  },
  {
    id: "3",
    name: "Santorini Sunset Point",
    address: "Oia, Santorini, Greece",
    phone: "+30 2286 123456",
    description:
      "Santorini is world-famous for its dramatic sea views, whitewashed houses, and stunning sunsets over the caldera. A must-visit for romance and relaxation.",
    facilities: ["Scenic viewpoints", "Boutique hotels", "Fine dining", "Boat tours"],
    culture: ["Greek traditional music", "Wine tasting tours", "Local art galleries"],
    youtubeLink: "https://www.youtube.com/watch?v=ekgUjyWe1Yc",
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
      "https://images.unsplash.com/photo-1504198266285-165a44a37b2f",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    ],
    videos: [
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
    ],
  },
];


type ViewMode = "list" | "add" | "edit" | "details"

export default function TouristSpotsPage() {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>(sampleTouristSpots)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddNew = () => {
    setSelectedSpot(null)
    setViewMode("add")
  }

  const handleEdit = (spot: TouristSpot) => {
    setSelectedSpot(spot)
    setViewMode("edit")
  }

  const handleDelete = (id: string) => {
    setTouristSpots((prev) => prev.filter((spot) => spot.id !== id))
  }

  const handleViewDetails = (spot: TouristSpot) => {
    setSelectedSpot(spot)
    setIsModalOpen(true)
  }

  const handleSubmit = (spotData: TouristSpot | Omit<TouristSpot, "id">) => {
    if (viewMode === "add") {
      const newSpot: TouristSpot = {
        ...(spotData as Omit<TouristSpot, "id">),
        id: Date.now().toString(),
      }
      setTouristSpots((prev) => [...prev, newSpot])
    } else if (viewMode === "edit" && selectedSpot) {
      setTouristSpots((prev) =>
        prev.map((spot) => (spot.id === selectedSpot.id ? { ...(spotData as TouristSpot) } : spot)),
      )
    }
    setViewMode("list")
    setSelectedSpot(null)
  }

  const handleCancel = () => {
    setViewMode("list")
    setSelectedSpot(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSpot(null)
  }

  if (viewMode === "add" || viewMode === "edit") {
    return (
      <TouristSpotForm
        touristSpot={selectedSpot || undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={viewMode === "edit"}
      />
    )
  }

  return (
    <>
      <TouristSpotList
        touristSpots={touristSpots}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {selectedSpot && <TouristSpotModal touristSpot={selectedSpot} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </>
  )
}
