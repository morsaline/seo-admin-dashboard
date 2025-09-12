"use client"

import { ServiceForm } from "@/components/Services/Service-Form"
import { Service, ServiceList } from "@/components/Services/Service-List"
import { ServiceModal } from "@/components/Services/Service-Modal"
import { useState } from "react"


export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "12345",
      name: "Anexo Praia Buzios",
      category: "Hospital",
      address: "Copacabana Dei Fiori",
      phone: "017022554477",
      facilities: ["Emergency Care", "24/7 Service", "Specialist Doctors"],
      image: "/modern-hospital-exterior.png",
    },
    {
      id: "12346",
      name: "Anexo Praia Buzios",
      category: "Photography",
      address: "Copacabana Dei Fiori",
      phone: "017022554477",
      facilities: ["Wedding Photography", "Portrait Sessions", "Event Coverage"],
      image: "/photography-studio.png",
    },
    {
      id: "12347",
      name: "Anexo Praia Buzios",
      category: "Transport",
      address: "Copacabana Dei Fiori",
      phone: "017022554477",
      facilities: ["Airport Transfer", "City Tours", "Private Cars"],
      image: "/transport-service.png",
    },
    {
      id: "12348",
      name: "Anexo Praia Buzios",
      category: "Restaurant",
      address: "Copacabana Dei Fiori",
      phone: "017022554477",
      facilities: ["Fine Dining", "Local Cuisine", "Outdoor Seating"],
      image: "/modern-restaurant-interior.png",
    },
    {
      id: "12349",
      name: "Anexo Praia Buzios",
      category: "Transport",
      address: "Copacabana Dei Fiori",
      phone: "017022554477",
      facilities: ["Bus Service", "Taxi Service", "Rental Cars"],
      image: "/transport-vehicles.png",
    },
  ])

  const [currentView, setCurrentView] = useState<"list" | "add" | "edit" | "details">("list")
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleAddNew = () => {
    setCurrentView("add")
    setSelectedService(null)
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setCurrentView("edit")
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const handleViewDetails = (service: Service) => {
    setSelectedService(service)
    setCurrentView("details")
  }

  const handleFormSubmit = (serviceData: Omit<Service, "id"> & { id?: string }) => {
    if (currentView === "edit" && serviceData.id) {
      setServices(services.map((service) => (service.id === serviceData.id ? (serviceData as Service) : service)))
    } else {
      const newService: Service = {
        ...serviceData,
        id: Date.now().toString(),
      }
      setServices([...services, newService])
    }
    setCurrentView("list")
    setSelectedService(null)
  }

  const handleCancel = () => {
    setCurrentView("list")
    setSelectedService(null)
  }

  const handleCloseModal = () => {
    setCurrentView("list")
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "list" && (
        <ServiceList
          services={services}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentView === "add" && <ServiceForm onSubmit={handleFormSubmit} onCancel={handleCancel} />}

      {currentView === "edit" && selectedService && (
        <ServiceForm service={selectedService} onSubmit={handleFormSubmit} onCancel={handleCancel} isEdit={true} />
      )}

      {currentView === "details" && selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  )
}
