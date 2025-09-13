"use client";

import { useState } from "react";

import { Beach, BeachList } from "@/components/Beaches/Beaches-List";
import { BeachForm } from "@/components/Beaches/Beaches-Form";
import { BeachModal } from "@/components/Beaches/Beach-Modal";
// import { Fashion } from "@/components/Fashions/Fashion-Type";

export default function BeachesPage() {
  const [beaches, setBeaches] = useState<Beach[]>([
    {
      id: "1",
      beachName: "Fashion Outlet Búzios",
      review: 5,
      address: "0.3 mi from Copacabana",
      image: "/fashion-store-1.jpg",
    },
    {
      id: "2",
      beachName: "Urban Style Rio",
      review: 4,
      address: "1.2 mi from Ipanema",
      image: "/fashion-store-2.jpg",
    },
    {
      id: "3",
      beachName: "Beachwear Trends",
      review: 5,
      address: "Av. Atlântica 200, Copacabana",
      image: "/fashion-store-3.jpg",
    },
  ]);

  const [currentView, setCurrentView] = useState<
    "list" | "add" | "edit" | "details"
  >("list");
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);

  const handleAddNew = () => {
    setCurrentView("add");
    setSelectedBeach(null);
  };

  const handleEdit = (beach: Beach) => {
    setSelectedBeach(beach);
    setCurrentView("edit");
  };

  const handleDelete = (id: string) => {
    setBeaches(beaches.filter((f) => f.id !== id));
  };

  const handleViewDetails = (beach: Beach) => {
    setSelectedBeach(beach);
    setCurrentView("details");
  };

  const handleFormSubmit = (
    beachData: Omit<Beach, "id"> & { id?: string }
  ) => {
    if (currentView === "edit" && beachData.id) {
      setBeaches(
        beaches.map((f) =>
          f.id === beachData.id ? (beachData as Beach) : f
        )
      );
    } else {
      const newBeach = {
        ...beachData,
        id: Date.now().toString(),
      };
      setBeaches([...beaches, newBeach]);
    }
    setCurrentView("list");
    setSelectedBeach(null);
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedBeach(null);
  };

  const handleCloseModal = () => {
    setCurrentView("list");
    setSelectedBeach(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "list" && (
        <BeachList
          beaches={beaches}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentView === "add" && (
        <BeachForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      )}

      {currentView === "edit" && selectedBeach && (
        <BeachForm
          beach={selectedBeach}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isEdit={true}
        />
      )}

      {currentView === "details" && selectedBeach && (
        <BeachModal beach={selectedBeach} onClose={handleCloseModal} />
      )}
    </div>
  );
}
