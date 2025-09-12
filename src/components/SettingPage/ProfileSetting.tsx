"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit2, Phone, Mail, MapPin } from "lucide-react"
import profilePhoto from "@/assets/image/hd.jpg"
import Image from "next/image"
import EditProfile from "./Edit_profileModal"



const ProfileInterface = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header with breadcrumb */}
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Active Order</div>
          <h1 className="text-xl font-semibold text-[#FF6203]">Active Order</h1>
        </div>

        {/* Profile Card */}
        <Card className="p-8 shadow-sm border border-border rounded-md">
          <div className="flex items-start justify-between">
            {/* Left: Profile Info */}
            <div className="flex gap-6">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <Image
                  src={profilePhoto}
                  alt="Joohn Emily Carter"
                  width={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>

              {/* Name + Intro */}
              <div className="space-y-3 max-w-md">
                <h2 className="text-xl font-semibold text-profile-heading">
                  Joohn Emily Carter
                </h2>
                <div>
                  <h3 className="font-medium text-profile-heading mb-1">
                    Introduction:
                  </h3>
                  <p className="text-profile-text leading-relaxed">
                    Lorem Ipsum as their for default model text, and a search for
                    &#39;lorem ipsum&#39; will uncover many web sites.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact + Edit */}
            <div className="relative min-w-[220px]">
              {/* Edit Button */}
              <button
                onClick={() => setIsEditModalOpen(true)} // <-- open modal
                className="absolute top-0 right-0 p-2 hover:bg-secondary rounded-md transition-colors"
              >
                <Edit2 className="w-4 h-4 text-profile-label" />
              </button>

              {/* Contact Info */}
              <div className="space-y-3 mt-10 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-profile-label" />
                  <div>
                    <div className="font-medium text-profile-heading">Contact</div>
                    <div className="text-profile-text">+84 0373467950</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-profile-label" />
                  <div>
                    <div className="font-medium text-profile-heading">Email</div>
                    <div className="text-profile-text">giangbanganh@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-profile-label" />
                  <div>
                    <div className="font-medium text-profile-heading">Address</div>
                    <div className="text-profile-text">Dhaka Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Change Password Card */}
        <Card className="p-8 shadow-sm border border-border rounded-md">
          <h2 className="text-xl font-medium text-profile-heading mb-6">
            Change Password
          </h2>

          <form className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-profile-heading mb-2">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="Enter Password"
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-profile-heading mb-2">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter New Password"
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-profile-heading mb-2">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Confirm New Password"
                className="bg-background border-border"
              />
            </div>

            <Button
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </Card>
      </div>

      {/* Render Edit Modal */}
      <EditProfile
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  )
}

export default ProfileInterface
