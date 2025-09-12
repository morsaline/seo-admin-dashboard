"use client";

import { useState, useMemo } from "react";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialUserData = [
  {
    id: "12345",
    name: "Wade Warren",
    email: "georgia.young@example.com",
    phone: "01702254477",
    country: "Brazil",
  },
  {
    id: "12346",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    phone: "01702254478",
    country: "USA",
  },
  {
    id: "12347",
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    phone: "01702254479",
    country: "Canada",
  },
  {
    id: "12348",
    name: "Ronald Richards",
    email: "ronald.richards@example.com",
    phone: "01702254480",
    country: "UK",
  },
  {
    id: "12349",
    name: "Marvin McKinney",
    email: "marvin.mckinney@example.com",
    phone: "01702254481",
    country: "Australia",
  },
  {
    id: "12350",
    name: "Jerome Bell",
    email: "jerome.bell@example.com",
    phone: "01702254482",
    country: "Germany",
  },
  {
    id: "12351",
    name: "Kathryn Murphy",
    email: "kathryn.murphy@example.com",
    phone: "01702254483",
    country: "France",
  },
  {
    id: "12352",
    name: "Jacob Jones",
    email: "jacob.jones@example.com",
    phone: "01702254484",
    country: "Spain",
  },
  {
    id: "12353",
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    phone: "01702254485",
    country: "Italy",
  },
  {
    id: "12354",
    name: "Darlene Robertson",
    email: "darlene.robertson@example.com",
    phone: "01702254486",
    country: "Netherlands",
  },
  {
    id: "12355",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    phone: "01702254487",
    country: "Sweden",
  },
  {
    id: "12356",
    name: "Annette Black",
    email: "annette.black@example.com",
    phone: "01702254488",
    country: "Norway",
  },
  {
    id: "12357",
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    phone: "01702254489",
    country: "Denmark",
  },
  {
    id: "12358",
    name: "Dianne Russell",
    email: "dianne.russell@example.com",
    phone: "01702254490",
    country: "Finland",
  },
  {
    id: "12359",
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    phone: "01702254491",
    country: "Belgium",
  },
  {
    id: "12360",
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    phone: "01702254492",
    country: "Switzerland",
  },
  {
    id: "12361",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    phone: "01702254493",
    country: "Austria",
  },
  {
    id: "12362",
    name: "Robert Fox",
    email: "robert.fox@example.com",
    phone: "01702254494",
    country: "Portugal",
  },
  {
    id: "12363",
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    phone: "01702254495",
    country: "Ireland",
  },
  {
    id: "12364",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    phone: "01702254496",
    country: "Poland",
  },
  {
    id: "12365",
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    phone: "01702254497",
    country: "Czech Republic",
  },
  {
    id: "12366",
    name: "Savannah Nguyen",
    email: "savannah.nguyen@example.com",
    phone: "01702254498",
    country: "Hungary",
  },
  {
    id: "12367",
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    phone: "01702254499",
    country: "Slovakia",
  },
  {
    id: "12368",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    phone: "01702254500",
    country: "Slovenia",
  },
  {
    id: "12369",
    name: "Ralph Edwards",
    email: "ralph.edwards@example.com",
    phone: "01702254501",
    country: "Croatia",
  },
];

export default function UserList() {
  const [users, setUsers] = useState(initialUserData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

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
    <div className="p-6 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">User list</p>
          <h1 className="text-2xl font-semibold text-orange-500">User List</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative w-72">
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
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  User Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Country
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.country}
                  </td>
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
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            users
          </div>

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
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 shadow-2xl">
          <div className="bg-white rounded-lg p-6 w-80 relative shadow-2xl">
            {/* <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button> */}
            <h2 className="text-lg text-center font-semibold mb-4 mx-auto">
              Do you want to remove ?
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
