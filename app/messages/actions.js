"use server";

import { createClient } from "@/lib/supabase/server"; // <-- Ganti import dari db dummy ke Supabase
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const supabase = await createClient();

  // Ambil ID pesan dari hidden input form
  const id = formData.get("id");

  if (!id) return;

  // Hapus data langsung dari tabel messages di Supabase
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  // Refresh cache Next.js agar pesan yang dihapus langsung hilang dari layar
  revalidatePath("/messages");
}