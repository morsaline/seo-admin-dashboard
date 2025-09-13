"use client";

import type * as React from "react";
import {
  Users,
  LayoutDashboard,
  UtensilsCrossed,
  Building,
  MapPin,
  Wrench,
  Handbag,
  TreePalm,
  Wine,
  Star,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "John Doe",
    email: "Admin",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BUZIOS GO",
      logo: () => <span className="font-bold">B</span>,
      plan: "Enterprise",
    },
  ],

  navMain: [
    {
      title: "Dashboards",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User",
      url: "/dashboard/user-list",
      icon: Users,
    },
    {
      title: "Restaurants List",
      url: "/dashboard/restaurants",
      icon: UtensilsCrossed,
    },
    {
      title: "Hotels List",
      url: "/dashboard/hotels",
      icon: Building,
    },
    {
      title: "Tourist Spot List",
      url: "/dashboard/tourist-spots",
      icon: MapPin,
    },
    {
      title: "Service List",
      url: "/dashboard/services",
      icon: Wrench,
    },
    {
      title: "Fashion",
      url: "/dashboard/fashions",
      icon: Handbag,
    },
    {
      title: "Beaches",
      url: "/dashboard/beaches",
      icon: TreePalm,
    },
    {
      title: "Bars",
      url: "/dashboard/bars",
      icon: Wine,
    },
    {
      title: "Review",
      url: "/dashboard/reviews",
      icon: Star,
    },
    {
      title: "Setting",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="relative bg-white" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
