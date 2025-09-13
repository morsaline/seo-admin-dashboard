"use client";

import { useState } from "react";

import { Bar, BarList } from "@/components/Bars/Bars-List";
import { BarForm } from "@/components/Bars/Bars-Form";
import { BarModal } from "@/components/Bars/Bars-Modal";
// import { BeachModal } from "@/components/Beaches/Beach-Modal";
// import { Fashion } from "@/components/Fashions/Fashion-Type";

export default function BarsPage() {
  const [bars, setBars] = useState<Bar[]>([
    {
      id: "1",
      barName: "Fashion Outlet Búzios",
      review: 5,
      address: "0.3 mi from Copacabana",
      image: "/fashion-store-1.jpg",
    },
    {
      id: "2",
      barName: "Urban Style Rio",
      review: 4,
      address: "1.2 mi from Ipanema",
      image: "/fashion-store-2.jpg",
    },
    {
      id: "3",
      barName: "Beachwear Trends",
      review: 5,
      address: "Av. Atlântica 200, Copacabana",
      image: "/fashion-store-3.jpg",
    },
  ]);

  const [currentView, setCurrentView] = useState<
    "list" | "add" | "edit" | "details"
  >("list");
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  const handleAddNew = () => {
    setCurrentView("add");
    setSelectedBar(null);
  };

  const handleEdit = (bar: Bar) => {
    setSelectedBar(bar);
    setCurrentView("edit");
  };

  const handleDelete = (id: string) => {
    setBars(bars.filter((f) => f.id !== id));
  };

  const handleViewDetails = (bar: Bar) => {
    setSelectedBar(bar);
    setCurrentView("details");
  };

  const handleFormSubmit = (BarData: Omit<Bar, "id"> & { id?: string }) => {
    if (currentView === "edit" && BarData.id) {
      setBars(bars.map((f) => (f.id === BarData.id ? (BarData as Bar) : f)));
    } else {
      const newBar = {
        ...BarData,
        id: Date.now().toString(),
      };
      setBars([...bars, newBar]);
    }
    setCurrentView("list");
    setSelectedBar(null);
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedBar(null);
  };

  const handleCloseModal = () => {
    setCurrentView("list");
    setSelectedBar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "list" && (
        <BarList
          bars={bars}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentView === "add" && (
        <BarForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      )}

      {currentView === "edit" && selectedBar && (
        <BarForm
          bar={selectedBar}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isEdit={true}
        />
      )}

      {currentView === "details" && selectedBar && (
        <BarModal bar={selectedBar} onClose={handleCloseModal} />
      )}
    </div>
  );
}
