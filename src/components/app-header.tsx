import { SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"
// import { Bell } from "lucide-react"
// import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"

const AppHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b px-4">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-lg font-medium text-gray-900">Welcome Back, John Doe!</h1>
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
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-900">John Doe!</span>
            <span className="text-gray-500 text-xs">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
