"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Importing the X icon

interface EditProfileFormData {
  name: string;
  contact: string;
  email: string;
  address: string;
  license: string;
  vehicle: string;
  intro: string;
}

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const [formData, setFormData] = useState<EditProfileFormData>({
    name: "",
    contact: "",
    email: "",
    address: "",
    license: "",
    vehicle: "",
    intro: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl"
          >
            <Card className="shadow-lg rounded-2xl p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
              
              <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact</label>
                    <Input name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter Contact" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Driving License No</label>
                    <Input name="license" value={formData.license} onChange={handleChange} placeholder="Enter License No" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vehicle Number</label>
                    <Input name="vehicle" value={formData.vehicle} onChange={handleChange} placeholder="Enter Vehicle No" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">Introduction</label>
                  <Textarea name="intro" value={formData.intro} onChange={handleChange} placeholder="Enter Introduction" />
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                  <Button variant={"default"} >Save</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}