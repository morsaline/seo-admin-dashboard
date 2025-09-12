"use client"

import { HotelForm } from "@/components/Hotel/Hotel-From"
import { HotelList } from "@/components/Hotel/Hotel-List"
import { HotelModal } from "@/components/Hotel/Hotel-modal"
import { useState } from "react"


export interface Hotel {
  id: string
  name: string
  address: string
  whatsapp: string
  instagram: string
  phone: string
  description: string
  productImage: string
  rooms: Room[]
}

export interface Room {
  id: string
  name: string
  beds: string
  washroom: string
  parking: string
  gym: string
  swimming: string
  wifi: string
  breakfast: string
  picture: string
}

export default function HotelManagement() {
const [hotels, setHotels] = useState<Hotel[]>([
  {
    id: "H001",
    name: "Sunset Paradise Hotel",
    address: "Miami Beach, Florida",
    whatsapp: "0771002345",
    instagram: "@sunsetparadise",
    phone: "0123456789",
    description: "A vibrant hotel with stunning sunsets and beach access.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Deluxe Ocean View",
        beds: "2 Queen Beds",
        washroom: "En-suite",
        parking: "Available",
        gym: "24/7 Access",
        swimming: "Pool Access",
        wifi: "Free WiFi",
        breakfast: "Included",
        picture: "/images/hotel/business-hotel-room.png",
      },
      {
        id: "2",
        name: "Penthouse Suite",
        beds: "1 King Bed",
        washroom: "Luxury Bath",
        parking: "Valet",
        gym: "Private Gym",
        swimming: "Private Pool",
        wifi: "High Speed",
        breakfast: "Room Service",
        picture: "/images/hotel/deluxe-hotel-room.png",
      },
    ],
  },
  {
    id: "H002",
    name: "Mountain Retreat",
    address: "Aspen, Colorado",
    whatsapp: "0771002346",
    instagram: "@mountainretreat",
    phone: "0123456790",
    description: "Cozy lodge in the mountains with scenic views and skiing options.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Standard Cabin",
        beds: "1 Double Bed",
        washroom: "Shared",
        parking: "Street",
        gym: "No Access",
        swimming: "No Pool",
        wifi: "Basic WiFi",
        breakfast: "Not Included",
        picture: "/images/hotel/family-hotel-room.png",
      },
    ],
  },
  {
    id: "H003",
    name: "City Lights Hotel",
    address: "New York, Manhattan",
    whatsapp: "0771002347",
    instagram: "@citylights",
    phone: "0123456791",
    description: "Luxury hotel in the heart of the city with rooftop bar and skyline views.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Executive Suite",
        beds: "1 King Bed",
        washroom: "Jacuzzi",
        parking: "Valet",
        gym: "Premium Access",
        swimming: "Indoor Pool",
        wifi: "Ultra Fast",
        breakfast: "Chef Service",
        picture: "/images/hotel/ocean-suite-hotel-room.png",
      },
    ],
  },
  {
    id: "H004",
    name: "Tropical Escape",
    address: "Bali, Indonesia",
    whatsapp: "0771002348",
    instagram: "@tropicalescape",
    phone: "0123456792",
    description: "Relaxing beach resort surrounded by tropical gardens.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Family Villa",
        beds: "2 Double Beds",
        washroom: "2 Bathrooms",
        parking: "Private Spot",
        gym: "Kids Area",
        swimming: "Private Pool",
        wifi: "Family Plan",
        breakfast: "Buffet",
        picture: "/images/hotel/standard-hotel-room.png",
      },
    ],
  },
  {
    id: "H005",
    name: "Business Hub Hotel",
    address: "London, UK",
    whatsapp: "0771002349",
    instagram: "@businesshub",
    phone: "0123456793",
    description: "Modern hotel designed for business travelers with conference rooms.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Business Room",
        beds: "1 Queen Bed",
        washroom: "Modern",
        parking: "Business",
        gym: "Executive",
        swimming: "Adult Pool",
        wifi: "Business Class",
        breakfast: "Continental",
        picture: "/images/hotel/business-hotel-room.png",
      },
    ],
  },
  {
    id: "H006",
    name: "Desert Oasis Hotel",
    address: "Dubai, UAE",
    whatsapp: "0771002350",
    instagram: "@desertoasis",
    phone: "0123456794",
    description: "Luxury desert resort with camel rides and spa services.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Luxury Tent",
        beds: "2 Queen Beds",
        washroom: "Private",
        parking: "Available",
        gym: "No Access",
        swimming: "Pool Access",
        wifi: "Free WiFi",
        breakfast: "Included",
        picture: "/images/hotel/luxury-hotel-exterior.png",
      },
    ],
  },
  {
    id: "H007",
    name: "Lakeside Lodge",
    address: "Lake Tahoe, California",
    whatsapp: "0771002351",
    instagram: "@lakesidelodge",
    phone: "0123456795",
    description: "Charming lodge by the lake, perfect for fishing and boating.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Lake View Room",
        beds: "1 King Bed",
        washroom: "En-suite",
        parking: "Available",
        gym: "Gym Access",
        swimming: "Pool Access",
        wifi: "Free WiFi",
        breakfast: "Included",
        picture: "/images/hotel/family-hotel-room.png",
      },
    ],
  },
  {
    id: "H008",
    name: "Eco Green Hotel",
    address: "Vancouver, Canada",
    whatsapp: "0771002352",
    instagram: "@ecogreenhotel",
    phone: "0123456796",
    description: "Sustainable hotel with eco-friendly practices and organic meals.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Eco Suite",
        beds: "1 King Bed",
        washroom: "Modern",
        parking: "Eco Spot",
        gym: "Gym Access",
        swimming: "Pool Access",
        wifi: "High Speed",
        breakfast: "Organic",
        picture: "/images/hotel/ocean-suite-hotel-room.png",
      },
    ],
  },
  {
    id: "H009",
    name: "Historic Inn",
    address: "Rome, Italy",
    whatsapp: "0771002353",
    instagram: "@historicinn",
    phone: "0123456797",
    description: "A historic building converted into a boutique hotel with classic charm.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Classic Room",
        beds: "1 Double Bed",
        washroom: "Shared",
        parking: "Street",
        gym: "No Access",
        swimming: "No Pool",
        wifi: "Basic WiFi",
        breakfast: "Included",
        picture: "/images/hotel/ocean-suite-hotel-room.png",
      },
    ],
  },
  {
    id: "H010",
    name: "Island Retreat",
    address: "Maldives",
    whatsapp: "0771002354",
    instagram: "@islandretreat",
    phone: "0123456798",
    description: "Private island resort with overwater villas and crystal clear waters.",
    productImage: "/images/hotel/luxury-hotel-exterior.png",
    rooms: [
      {
        id: "1",
        name: "Overwater Villa",
        beds: "1 King Bed",
        washroom: "Jacuzzi",
        parking: "N/A",
        gym: "Private Gym",
        swimming: "Private Pool",
        wifi: "High Speed",
        breakfast: "Chef Service",
        picture: "/images/hotel/ocean-suite-hotel-room.png",
      },
    ],
  },
]);


  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list")
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (hotel: Hotel | Omit<Hotel, "id">) => {
    if ("id" in hotel) {
      // Edit
      setHotels(hotels.map((h) => (h.id === hotel.id ? hotel : h)))
      setEditingHotel(null)
    } else {
      // Add
      const newHotel: Hotel = {
        ...hotel,
        id: `H${String(Date.now()).slice(-3).padStart(3, "0")}`,
      }
      setHotels([...hotels, newHotel])
    }
    setCurrentView("list")
  }

  const handleDeleteHotel = (id: string) => {
    setHotels(hotels.filter((h) => h.id !== id))
  }

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setShowModal(true)
  }

  const handleEditClick = (hotel: Hotel) => {
    setEditingHotel(hotel)
    setCurrentView("edit")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto">
        {/* Hotel List */}
        {currentView === "list" && (
          <HotelList
            hotels={hotels}
            onAddNew={() => setCurrentView("add")}
            onEdit={handleEditClick}
            onDelete={handleDeleteHotel}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Add Hotel */}
        {currentView === "add" && <HotelForm onSubmit={handleSubmit} onCancel={() => setCurrentView("list")} />}

        {/* Edit Hotel */}
        {currentView === "edit" && editingHotel && (
          <HotelForm hotel={editingHotel} onSubmit={handleSubmit} onCancel={() => setCurrentView("list")} isEditing />
        )}
      </div>

      {/* View Hotel Modal */}
      {showModal && selectedHotel && <HotelModal hotel={selectedHotel} onClose={() => setShowModal(false)} />}
    </div>
  )
}
