/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { RestaurantList } from "@/components/Restaurant/Restaurant-List";
import { RestaurantForm } from "@/components/Restaurant/Restaurant-From";
import { RestaurantModal } from "@/components/Restaurant/Restaurant-modal";
import { useGetAllRestaurantsQuery } from "@/redux/features/restaurantsApi/restaurantsApi";
import Loader from "@/lib/Loader";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  whatsapp: string;
  instagram: string;
  description: string;
  productImage: string;
  menuItems: MenuItem[];
}


export interface MenuItem {
  id: string;
  name: string;
  itemG1: string;
  itemG2: string;
  itemG3: string;
  price: string;
  picture: string;
}

export default function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllRestaurantsQuery({
    page,
    limit,
    search: searchTerm,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const apiRestaurants = data?.data?.data || [];

  // Convert API response -> Restaurant type
  const restaurants: Restaurant[] = useMemo(() => {
    return apiRestaurants?.map((r: any) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      whatsapp: r.whatsapp,
      instagram: r.instagram,
      description: r.description,
      productImage: r.productImage,
      menuItems:
        r.menus?.map((m: any) => ({
          id: m.id,
          name: m.foodName,
          itemG1: m.items?.[0] || "",
          itemG2: m.items?.[1] || "",
          itemG3: m.items?.[2] || "",
          price: `$${m.price}`,
          picture: m.foodPicture,
        })) || [],
    }));
  }, [apiRestaurants]);

  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">(
    "list"
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  // Handlers
  const handleSubmit = (restaurant: Restaurant | Omit<Restaurant, "id">) => {
    console.log("Submit restaurant:", restaurant);
    setCurrentView("list");
  };

  const handleDeleteRestaurant = (id: string) => {
    console.log("Delete restaurant:", id);
  };

  const handleViewDetails = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setCurrentView("edit");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto">
        {/* Restaurant List */}
        {currentView === "list" && (
          <RestaurantList
            restaurants={restaurants}
            onAddNew={() => setCurrentView("add")}
            onEdit={handleEditClick}
            onDelete={handleDeleteRestaurant}
            onViewDetails={handleViewDetails}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            page={page}
            setPage={setPage}
            totalPages={data?.data?.meta?.totalPages || 1}
          />
        )}

        {/* Edit Restaurant */}
        {currentView === "edit" && editingRestaurant && (
          <RestaurantForm
            restaurant={editingRestaurant}
            onSubmit={handleSubmit}
            onCancel={() => setCurrentView("list")}
            isEditing
          />
        )}
      </div>

      {/* View Restaurant Modal */}
      {showModal && selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
