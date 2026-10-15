"use client";

import Link from "next/link";
import { LogOut, PanelLeft, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar"
          onClick={onMenuClick}
        >
          <PanelLeft />
        </Button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              className="h-auto gap-2 rounded-full px-2 py-1"
            />
          }
        >
          <Avatar className="size-8">
            <AvatarFallback>
              <UserRound className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Admin</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-sm font-medium">Admin account</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/login" />}>
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
  