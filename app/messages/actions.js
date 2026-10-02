"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  // 1. Cari indeks pesan yang mau dihapus berdasarkan id
  const index = messages.findIndex((msg) => msg.id === id);

  // 2. Jika ditemukan, hapus 1 pesan dari array messages di lib/db.js
  if (index !== -1) {
    messages.splice(index, 1);

    // 3. Panggil revalidatePath agar Next.js memperbarui cache halaman /messages
    revalidatePath("/messages");
  }
}