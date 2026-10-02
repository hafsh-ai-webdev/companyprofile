// import { favorites } from "@/lib/db";

// export async function DELETE(request, { params }) {
//   const { id } = await params;
//   const index = favorites.findIndex((f) => String(f.id) === id);

//   if (index === -1) {
//     return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
//   }

//   favorites.splice(index, 1);
//   return Response.json({ message: "Berhasil dihapus" });
// }

// // Fitur Baru: PATCH untuk mengubah / menambah field note
// export async function PATCH(request, { params }) {
//   const { id } = await params;
//   const index = favorites.findIndex((f) => String(f.id) === id);

//   if (index === -1) {
//     return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
//   }

//   const body = await request.json().catch(() => ({}));

//   // Update field note jika dikirimkan dari client
//   if (body.note !== undefined) {
//     favorites[index].note = body.note;
//   }

//   return Response.json(favorites[index]);
// }




import { removeFavorite } from "@/lib/services/favoriteService";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const numId = Number(id);
  const result = removeFavorite(numId);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: "Berhasil dihapus" });
}