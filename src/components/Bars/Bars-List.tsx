"use client";

import { useState, useMemo } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Bar {
  id: string;
  barName: string;
  review: 1 | 2 | 3 | 4 | 5 | number;
  address: string;
  image?: File | string | null;
}

interface BarsListProps {
  bars: Bar[];
  onAddNew: () => void;
  onEdit: (fashion: Bar) => void;
  onDelete: (id: string) => void;
  onViewDetails: (fashion: Bar) => void;
}

export function BarList({
  bars,
  onAddNew,
  onEdit,
  onDelete,
  onViewDetails,
}: BarsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarId, setSelectedBarId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filteredBars = useMemo(() => {
    return bars?.filter(
      (service) =>
        service.barName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, bars]);

  const totalPages = Math.ceil(filteredBars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBars = filteredBars.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const openDeleteModal = (barId: string) => {
    setSelectedBarId(barId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBarId(null);
  };

  const confirmDelete = () => {
    if (selectedBarId) {
      onDelete(selectedBarId);
      closeModal();
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) for (let i = 1; i <= 5; i++) pages.push(i);
      else if (currentPage >= totalPages - 2)
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      else
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1">Bars List</p>
          <h1 className="text-xl md:text-2xl font-semibold text-orange-500">
            Bars List
          </h1>
        </div>

        {/* Search + Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search listing..."
              className="pl-10 rounded-md border-gray-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Button
            onClick={onAddNew}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            + Add Bar
          </Button>
        </div>

        {/* Table Wrapper for mobile scroll */}
        <div className="bg-white rounded-md shadow border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left font-medium">
                  Bar ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-medium">
                  Bar Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-medium">
                  Location
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBars.map((bar, index) => (
                <tr
                  key={bar.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 sm:px-6 py-3 border-t">{bar.id}</td>
                  <td className="px-4 sm:px-6 py-3 border-t">{bar.barName}</td>
                  <td className="px-4 sm:px-6 py-3 border-t">{bar.address}</td>

                  <td className="px-4 sm:px-6 py-3 border-t">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:text-gray-900"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={() => onEdit(bar)}
                          className="cursor-pointer"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onViewDetails(bar)}
                          className="cursor-pointer"
                        >
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteModal(bar.id)}
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
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          {/* Left: info */}
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredBars.length)} of {filteredBars.length}{" "}
            Bars
          </div>

          {/* Right: page numbers */}
          <div className="flex flex-wrap items-center justify-center gap-2">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative shadow-2xl">
            <h2 className="text-lg text-center font-semibold mb-4">
              Do you want to remove?
            </h2>
            <div className="flex justify-around gap-2">
              <Button
                variant="ghost"
                onClick={closeModal}
                className="text-[#FF6203]"
              >
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
  );
}
