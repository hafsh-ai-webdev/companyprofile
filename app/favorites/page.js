"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        {/* Tombol kembali */}
        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6 font-medium transition-colors"
        >
          ← Kembali ke User Directory
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Koleksi Favorit
          </span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            My Favorite Users
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Daftar pengguna pilihan yang sudah kamu simpan secara dinamis.
          </p>
        </div>

        {/* Konten Favorit */}
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-foreground/[0.02] p-12 text-center backdrop-blur-sm dark:border-white/10">
            <p className="text-muted-foreground mb-6">
              Belum ada user yang kamu tambahkan ke daftar favorit.
            </p>
            <Link
              href="/users"
              className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 shadow-md hover:shadow-primary/20"
            >
              Jelajahi User Directory
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}