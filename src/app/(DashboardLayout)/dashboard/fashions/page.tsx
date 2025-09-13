"use client";

import { useState } from "react";
import { FashionForm } from "@/components/Fashions/Fashion-Form";
import { Fashion, FashionList } from "@/components/Fashions/Fashion-List";
import { FashionModal } from "@/components/Fashions/Fashion-Modal";
// import { Fashion } from "@/components/Fashions/Fashion-Type";

export default function FashionsPage() {
  const [fashions, setFashions] = useState<Fashion[]>([
    {
      id: "1",
      storeName: "Fashion Outlet Búzios",
      review: 5,
      address: "0.3 mi from Copacabana",
      image: "/fashion-store-1.jpg",
    },
    {
      id: "2",
      storeName: "Urban Style Rio",
      review: 4,
      address: "1.2 mi from Ipanema",
      image: "/fashion-store-2.jpg",
    },
    {
      id: "3",
      storeName: "Beachwear Trends",
      review: 5,
      address: "Av. Atlântica 200, Copacabana",
      image: "/fashion-store-3.jpg",
    },
  ]);

  const [currentView, setCurrentView] = useState<
    "list" | "add" | "edit" | "details"
  >("list");
  const [selectedFashion, setSelectedFashion] = useState<Fashion | null>(null);

  const handleAddNew = () => {
    setCurrentView("add");
    setSelectedFashion(null);
  };

  const handleEdit = (fashion: Fashion) => {
    setSelectedFashion(fashion);
    setCurrentView("edit");
  };

  const handleDelete = (id: string) => {
    setFashions(fashions.filter((f) => f.id !== id));
  };

  const handleViewDetails = (fashion: Fashion) => {
    setSelectedFashion(fashion);
    setCurrentView("details");
  };

  const handleFormSubmit = (
    fashionData: Omit<Fashion, "id"> & { id?: string }
  ) => {
    if (currentView === "edit" && fashionData.id) {
      setFashions(
        fashions.map((f) =>
          f.id === fashionData.id ? (fashionData as Fashion) : f
        )
      );
    } else {
      const newFashion: Fashion = {
        ...fashionData,
        id: Date.now().toString(),
      };
      setFashions([...fashions, newFashion]);
    }
    setCurrentView("list");
    setSelectedFashion(null);
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedFashion(null);
  };

  const handleCloseModal = () => {
    setCurrentView("list");
    setSelectedFashion(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "list" && (
        <FashionList
          Fashions={fashions}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentView === "add" && (
        <FashionForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      )}

      {currentView === "edit" && selectedFashion && (
        <FashionForm
          fashion={selectedFashion}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isEdit={true}
        />
      )}

      {currentView === "details" && selectedFashion && (
        <FashionModal fashion={selectedFashion} onClose={handleCloseModal} />
      )}
    </div>
  );
}
