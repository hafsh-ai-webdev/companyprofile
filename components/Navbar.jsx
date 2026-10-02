"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useFavorite } from "@/context/FavoriteContext";
import ThemeToggle from "@/components/ThemeToogle";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();
  const { favorites } = useFavorite();

  // 1. State Guard untuk mencegah Hydration Error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Tampilkan angka favorit hanya jika sudah mounted di browser
  const favCount = mounted ? favorites.length : 0;

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/profile", label: "Profile" },
    { href: "/contact", label: "Contact" },
    { 
      href: "/favorites", 
      label: `Favorite (${favCount})` 
    },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-lg shadow-black/5 backdrop-blur-xl transition-all dark:border-white/10 dark:shadow-black/20 md:px-5 md:py-2.5">
        
        {/* Logo / Brand */}
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap text-base font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-lg"
        >
          RasunaSaid
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:text-foreground md:px-3.5 md:text-sm",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User Greeting, Theme Toggle & CTA */}
        <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
          {/* 3. Hanya tampilkan sapaan nama jika sudah mounted di client */}
          {mounted && submitted && (
            <span className="hidden whitespace-nowrap text-xs font-medium text-muted-foreground lg:inline-block md:text-sm">
              Hi, <span className="font-semibold text-primary">{name}</span> 👋
            </span>
          )}

          {/* Pemanggilan Komponen ThemeToggle */}
          <ThemeToggle />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "default" }),
              "whitespace-nowrap rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:shadow-primary/20 text-xs md:text-sm px-4 md:px-5"
            )}
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}