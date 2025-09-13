"use client";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
// import { Bell } from "lucide-react"
// import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAppSelector } from "@/hooks/hooks";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";

const AppHeader = () => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)
  useGetProfileQuery(undefined, {
    skip: !token,
  });

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b px-4">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-lg font-medium text-gray-900">
          Welcome Back, {user?.fullName || 'No Name'}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">0</span>
          </div>
        </div> */}

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileImage || "https://github.com/shadcn.png"} />
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-gray-900">{user?.fullName || "No Name"}</span>
            <span className="font-medium text-gray-900">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
