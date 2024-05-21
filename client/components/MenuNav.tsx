"use client";

import Link from "next/link";
import { Menu, Book, LibraryBig, Stamp, Home, Mails } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MenuNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <LibraryBig className="h-6 w-6" />
            <span className="">Librería</span>
          </Link>
          <Link
            href="/"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
              pathname === "/"
                ? "bg-muted text-foreground"
                : "text-muted-foreground "
            )}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/newsletters"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
              pathname === "/books"
                ? "bg-muted text-foreground"
                : "text-muted-foreground "
            )}
          >
            <Mails className="h-4 w-4" />
            Newsletters
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
