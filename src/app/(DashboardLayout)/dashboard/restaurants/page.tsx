"use client";

import { useState } from "react";
import { RestaurantList } from "@/components/Restaurant/Restaurant-List";
import { RestaurantForm } from "@/components/Restaurant/Restaurant-From";
import { RestaurantModal } from "@/components/Restaurant/Restaurant-modal";

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
const [restaurants, setRestaurants] = useState<Restaurant[]>([
  {
    id: "1",
    name: "Sunset Grill",
    address: "123 Beach Ave, Miami",
    whatsapp: "+15551234567",
    instagram: "@sunsetgrill",
    description: "A perfect spot for seafood lovers with an ocean view.",
    productImage: "/images/restaurant/resturent.png",
    menuItems: [
      {
        id: "1",
        name: "Seared Salmon",
        itemG1: "Fresh Atlantic Salmon",
        itemG2: "Lemon Butter Sauce",
        itemG3: "Grilled to perfection",
        price: "$28.00",
        picture: "/images/restaurant/Seared Salmon.jpg",
      },
      {
        id: "2",
        name: "Avocado Toast",
        itemG1: "Sourdough Bread",
        itemG2: "Ripe Avocado",
        itemG3: "Sprinkled with Seeds",
        price: "$12.00",
        picture: "/images/restaurant/Avocado Toast.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "Mountain Deli",
    address: "456 Hilltop Rd, Denver",
    whatsapp: "+15557654321",
    instagram: "@mountaindeli",
    description: "Cozy deli with fresh sandwiches and local delicacies.",
    productImage: "/images/restaurant/resturent.png",
    menuItems: [
      {
        id: "1",
        name: "Turkey Sandwich",
        itemG1: "Whole Grain Bread",
        itemG2: "Smoked Turkey",
        itemG3: "Swiss Cheese",
        price: "$15.00",
        picture: "/images/restaurant/Turkey Sandwich.jpg",
      },
      {
        id: "2",
        name: "Veggie Wrap",
        itemG1: "Spinach Tortilla",
        itemG2: "Fresh Veggies",
        itemG3: "Hummus Spread",
        price: "$13.00",
        picture: "/images/restaurant/Veggie Wrap.jpeg",
      },
    ],
  },
  {
    id: "3",
    name: "Urban Eats",
    address: "789 Downtown St, New York",
    whatsapp: "+15559876543",
    instagram: "@urbaneats",
    description: "Trendy spot for fusion dishes and gourmet street food.",
    productImage: "/images/restaurant/resturent.png",
    menuItems: [
      {
        id: "1",
        name: "Spicy Ramen",
        itemG1: "Handmade Noodles",
        itemG2: "Rich Broth",
        itemG3: "Soft Boiled Egg",
        price: "$18.00",
        picture: "/images/restaurant/Spicy Ramen.jpg",
      },
      {
        id: "2",
        name: "Korean Tacos",
        itemG1: "Soft Corn Tortilla",
        itemG2: "Marinated Beef",
        itemG3: "Kimchi Slaw",
        price: "$14.00",
        picture: "/images/restaurant/Korean Tacos.jpg",
      },
    ],
  },
  {
    id: "4",
    name: "Green Garden Café",
    address: "321 Forest Lane, Portland",
    whatsapp: "+15553456789",
    instagram: "@greengardencafe",
    description: "Healthy and fresh café with vegetarian and vegan options.",
    productImage: "/images/restaurant/resturent.png",
    menuItems: [
      {
        id: "1",
        name: "Quinoa Salad",
        itemG1: "Organic Quinoa",
        itemG2: "Roasted Veggies",
        itemG3: "Citrus Dressing",
        price: "$16.00",
        picture: "/images/restaurant/Quinoa Salad.jpeg",
      },
      {
        id: "2",
        name: "Smoothie Bowl",
        itemG1: "Fresh Fruits",
        itemG2: "Chia Seeds",
        itemG3: "Almond Milk",
        price: "$11.00",
        picture: "/images/restaurant/Smoothie Bowl.jpg",
      },
    ],
  },
  {
    id: "5",
    name: "The Cozy Corner",
    address: "987 Maple St, Boston",
    whatsapp: "+15550987654",
    instagram: "@cozycornerboston",
    description: "Charming café perfect for coffee and pastries.",
    productImage: "/images/restaurant/resturent.png",
    menuItems: [
      {
        id: "1",
        name: "Cappuccino",
        itemG1: "Espresso Shot",
        itemG2: "Steamed Milk",
        itemG3: "Foam Art",
        price: "$5.00",
        picture: "/images/restaurant/Cappuccino.jpeg",
      },
      {
        id: "2",
        name: "Croissant",
        itemG1: "Buttery Layers",
        itemG2: "Almond Filling",
        itemG3: "Flaky Texture",
        price: "$4.00",
        picture: "/images/restaurant/Croissant.jpg",
      },
    ],
  },
]);


  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">(
    "list"
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  // Unified submit handler for both Add and Edit
  const handleSubmit = (restaurant: Restaurant | Omit<Restaurant, "id">) => {
    if ("id" in restaurant) {
      // Edit
      setRestaurants(
        restaurants.map((r) => (r.id === restaurant.id ? restaurant : r))
      );
      setEditingRestaurant(null);
    } else {
      // Add
      const newRestaurant: Restaurant = {
        ...restaurant,
        id: Date.now().toString(),
      };
      setRestaurants([...restaurants, newRestaurant]);
    }
    setCurrentView("list");
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  const handleViewDetails = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setCurrentView("edit");
  };

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
          />
        )}

        {/* Add Restaurant */}
        {currentView === "add" && (
          <RestaurantForm
            onSubmit={handleSubmit}
            onCancel={() => setCurrentView("list")}
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
