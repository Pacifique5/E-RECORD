"use client";
import { ChevronDown, Settings, LogOut, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTerm, setSelectedTerm] = useState("first");

  const years = ["2023", "2024", "2025", "2026"];
  const terms = [
    { value: "first", label: "First Term" },
    { value: "second", label: "Second Term" },
    { value: "third", label: "Third Term" },
  ];

  const user = {
    name: "fique paci",
    role: "Accountant",
    avatar: "/fique.jpg"
  };

  return (
    <div className="fixed top-0 right-0 left-64 z-10 bg-white border-b border-gray-100">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg text-gray-900">Welcome to our platform fique</h1>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                {terms.map((term) => (
                  <SelectItem key={term.value} value={term.value}>
                    {term.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="max-w-64">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10 rounded-full">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="rounded-full bg-gray-200 dark:bg-gray-700">
                        {user.name.charAt(0)}
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
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="rounded-full dark:bg-gray-700">
                          {user.name.charAt(0)}
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
                      <Settings className="mr-2 size-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="dark:border-gray-700" />

                  <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
                    <BadgeCheck className="mr-2 size-4" />
                    Account Information
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="dark:border-gray-700" />

                  <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 dark:hover:bg-gray-700">
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
