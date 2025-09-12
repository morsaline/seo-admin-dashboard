"use client"

import { useState, useMemo } from "react"
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Service {
  id: string
  name: string
  category: string
  address: string
  phone: string
  facilities: string[]
  image: string
}

interface ServiceListProps {
  services: Service[]
  onAddNew: () => void
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  onViewDetails: (service: Service) => void
}

export function ServiceList({ services, onAddNew, onEdit, onDelete, onViewDetails }: ServiceListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

  const itemsPerPage = 10

  const filteredServices = useMemo(() => {
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, services])

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentServices = filteredServices.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  const openDeleteModal = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedServiceId(null)
  }

  const confirmDelete = () => {
    if (selectedServiceId) {
      onDelete(selectedServiceId)
      closeModal()
    }
  }

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

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1">Sponsors List</p>
          <h1 className="text-xl font-semibold text-orange-500">Sponsors List</h1>
        </div>

        {/* Search + Add Button */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search listing..."
              className="pl-10 rounded-md border-gray-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <Button onClick={onAddNew} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
            + Add Service
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Sponsor ID</th>
                <th className="px-6 py-3 text-left font-medium">Sponsor Name</th>
                <th className="px-6 py-3 text-left font-medium">Location</th>
                <th className="px-6 py-3 text-left font-medium">Phone</th>
                <th className="px-6 py-3 text-left font-medium">Service</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service, index) => (
                <tr key={service.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 border-t">{service.id}</td>
                  <td className="px-6 py-3 border-t">{service.name}</td>
                  <td className="px-6 py-3 border-t">{service.address}</td>
                  <td className="px-6 py-3 border-t">{service.phone}</td>
                  <td className="px-6 py-3 border-t">{service.category}</td>
                  <td className="px-6 py-3 border-t">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => onEdit(service)} className="cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewDetails(service)} className="cursor-pointer">
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteModal(service.id)}
                          className="cursor-pointer text-red-500 focus:text-red-600"
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          {/* Left: info */}
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredServices.length)} of {filteredServices.length}{" "}
            services
          </div>

          {/* Right: page numbers */}
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

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-80 relative shadow-2xl">
            <h2 className="text-lg text-center font-semibold mb-4">Do you want to remove?</h2>
            <div className="flex justify-around gap-2">
              <Button variant="ghost" onClick={closeModal} className="text-[#FF6203]">
                No
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
