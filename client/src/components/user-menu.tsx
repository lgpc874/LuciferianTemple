import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut } from "lucide-react";

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700">
          <div className="flex items-center justify-center w-full h-full">
            <User className="h-5 w-5 text-red-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none text-red-300 font-serif">
            {user.username}
          </p>
          <p className="text-xs leading-none text-gray-400">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={logout}
          className="text-red-400 hover:text-red-300 hover:bg-gray-800 cursor-pointer font-serif"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Deixar o Templo</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}