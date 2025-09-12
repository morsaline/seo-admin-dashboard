"use client"

import { ReviewList } from "@/components/Reviews/Review-List"
import { useState } from "react"


export interface Review {
  id: string
  userName: string
  reviewTo: string
  reviewText: string
  date: string
  rating: number
  published: boolean
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. The food was delicious and the service was excellent.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "2",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. The ambiance was perfect for our dinner.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "3",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. Great location and friendly staff.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "4",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. Will definitely come back again.",
      date: "May 19, 2025",
      rating: 5.0,
      published: false,
    },
    {
      id: "5",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. Highly recommended to everyone.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "6",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. The desserts were amazing.",
      date: "May 19, 2025",
      rating: 5.0,
      published: false,
    },
    {
      id: "7",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. Perfect for special occasions.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "8",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. The chef's special was outstanding.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
    {
      id: "9",
      userName: "Alena Gouse",
      reviewTo: "Xyz Restaurant",
      reviewText: "We were extremely happy with this restaurant. Great value for money.",
      date: "May 19, 2025",
      rating: 5.0,
      published: true,
    },
  ])

  const handleTogglePublish = (id: string, published: boolean) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, published } : review)))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto">
        <ReviewList reviews={reviews} onTogglePublish={handleTogglePublish} />
      </div>
    </div>
  )
}
