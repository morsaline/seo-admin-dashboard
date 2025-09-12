"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronLeft, ChevronRight,} from "lucide-react"

const userData = [
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "(+1) 9025564477",
    country: "Brazil",
  },
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "(+1) 9025564477",
    country: "Brazil",
  },
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "(+1) 9025564477",
    country: "Brazil",
  },
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "(+1) 9025564477",
    country: "Brazil",
  },
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "(+1) 9025564477",
    country: "Brazil",
  },
]

export default function UserListTable() {
  const [users, setUsers] = useState(userData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const openDeleteModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      setUsers(users.filter((user) => user.id !== selectedUserId));
      if (currentPage > 1 && currentUsers.length === 1) {
        setCurrentPage(currentPage - 1);
      }
      closeModal();
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="p-2 max-w-full">
      {/* Search Bar */}
      {/* <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
        <Input
          placeholder="Search listing..."
          className="pl-10 bg-white border-gray-200"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">User ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium">User Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Country</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50" }>
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.country}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 flex-wrap gap-2">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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
  );
}
