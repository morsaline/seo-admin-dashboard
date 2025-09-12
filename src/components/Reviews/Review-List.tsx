"use client"

import { useState, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Review } from "@/app/(DashboardLayout)/dashboard/reviews/page"

interface ReviewListProps {
  reviews: Review[]
  onTogglePublish: (id: string, published: boolean) => void
}

export function ReviewList({ reviews, onTogglePublish }: ReviewListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const filteredReviews = useMemo(() => {
    return reviews.filter(
      (review) =>
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, reviews])

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = filteredReviews.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) for (let i = 1; i <= 5; i++) pages.push(i)
      else if (currentPage >= totalPages - 2) for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      else for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i)
    }
    return pages
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1">Review</p>
          <h1 className="text-xl font-semibold text-orange-500">All Reviews</h1>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              className="pl-10 rounded-md border-gray-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium">User Name</th>
                <th className="px-6 py-3 text-left font-medium">Review To</th>
                <th className="px-6 py-3 text-left font-medium">Review Text</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Rating</th>
                <th className="px-6 py-3 text-left font-medium">Publish</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review, index) => (
                <tr key={review.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 border-t">{review.userName}</td>
                  <td className="px-6 py-3 border-t">{review.reviewTo}</td>
                  <td className="px-6 py-3 border-t max-w-xs truncate">{review.reviewText}</td>
                  <td className="px-6 py-3 border-t">{review.date}</td>
                  <td className="px-6 py-3 border-t">{renderStars(review.rating)}</td>
                  <td className="px-6 py-3 border-t">
                    <Switch
                      checked={review.published}
                      onCheckedChange={(checked) => onTogglePublish(review.id, checked)}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination aligned to right */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                size="sm"
                variant={currentPage === pageNum ? "default" : "ghost"}
                className={
                  currentPage === pageNum
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
