"use client";

import Link from "next/link";
import { Book, Home, Mails } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
          pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground "
        )}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/newsletters"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
          pathname === "/newsletters"
            ? "bg-muted text-primary"
            : "text-muted-foreground "
        )}
      >
        <Mails className="h-4 w-4" />
        Newsletters
      </Link>
    </nav>
  );
}
