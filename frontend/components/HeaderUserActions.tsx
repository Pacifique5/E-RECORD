"use client";
import { BadgeCheck, LogOut, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";

export function HeaderUserActions({
  user,
}: {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}) {
  const router = useRouter();
  const { logout, user: authUser } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/landing');
  };

  // Determine account page URL based on role
  const getAccountUrl = () => {
    const role = authUser?.role || user.role.toLowerCase();
    if (role === 'headmaster') return '/portal/headmaster/account';
    if (role === 'accountant') return '/portal/accountant/account';
    if (role === 'admin') return '/admin/account';
    return '/portal/account';
  };

  // Get profile picture URL
  const getProfilePicture = () => {
    if (authUser?.profilePicture) {
      return `http://localhost:3001${authUser.profilePicture}`;
    }
    return user.avatar || null;
  };

  // Get user initials for fallback
  const getUserInitials = () => {
    if (authUser?.firstName && authUser?.lastName) {
      return `${authUser.firstName.charAt(0)}${authUser.lastName.charAt(0)}`;
    }
    return user.name.charAt(0);
  };

  const profilePicture = getProfilePicture();
  const userInitials = getUserInitials();
  return (
    <div className="max-w-64">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-0 rounded-full ring-2 ring-blue-500 shadow-sm transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-400 hover:ring-4 hover:ring-blue-400 cursor-pointer">
            <Avatar className="h-10 w-10 rounded-full">
              {profilePicture ? (
                <AvatarImage
                  src={profilePicture}
                  alt={user.name}
                />
              ) : null}
              <AvatarFallback className="rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                <span className="text-sm font-bold text-gray-600">{userInitials}</span>
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-10 w-10 rounded-full">
                {profilePicture ? (
                  <AvatarImage
                    src={profilePicture}
                    alt={user.name}
                  />
                ) : null}
                <AvatarFallback className="rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                  <span className="text-sm font-bold text-gray-600">{userInitials}</span>
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold dark:text-gray-200">
                  {user.name}
                </span>
                <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="dark:border-gray-700" />

          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
              <Sparkles className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="dark:border-gray-700" />

          <Link href={getAccountUrl()}>
            <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
              <BadgeCheck className="mr-2 size-4" />
              Account Information
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator className="dark:border-gray-700" />

          <DropdownMenuItem 
            className="cursor-pointer text-red-500 hover:text-red-600 dark:hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 