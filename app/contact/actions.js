"use server"; // 1. Wajib di baris paling atas

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache"; // 2. Import revalidatePath dari next/cache

export async function submitContactForm(formData) {
  const supabase = await createClient();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  const { error } = await supabase
    .from("messages")
    .insert({ name, email, message });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/messages");

  return { success: true };
}