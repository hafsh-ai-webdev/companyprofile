"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(user.id);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Card className="group border border-border/60 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20 dark:border-white/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
          <CardTitle className="text-base font-bold text-foreground">
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {user.company?.name || user.company}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Button className="flex-1 rounded-full font-semibold shadow-sm transition-all">
            View Profile
          </Button>

          <Button
            type="button"
            variant={favorited ? "default" : "outline"}
            onClick={() => toggleFavorite(user)}
            className={`rounded-full transition-all ${
              favorited
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border/60 hover:bg-primary/10 hover:text-primary dark:border-white/10"
            }`}
          >
            {favorited ? "♥ Favorite" : "♡ Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}