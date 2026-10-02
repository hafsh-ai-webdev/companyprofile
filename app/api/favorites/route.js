// import { favorites } from "@/lib/db";

// export async function GET() {
//   return Response.json(favorites);
// }

// export async function POST(request) {
//   // Ambil body JSON, jika kosong berikan object kosong
//   const body = await request.json().catch(() => ({}));

//   // Validasi: jika body kosong ATAU tidak ada id ATAU tidak ada name
//   if (!body || Object.keys(body).length === 0 || !body.id || !body.name) {
//     return Response.json(
//       { error: "Body tidak boleh kosong. id dan name wajib diisi" },
//       { status: 400 }
//     );
//   }

//   // Cek apakah user sudah ada di favorites
//   const alreadyExists = favorites.some((f) => String(f.id) === String(body.id));
//   if (alreadyExists) {
//     return Response.json(
//       { error: "User ini sudah difavoritkan" },
//       { status: 400 }
//     );
//   }

//   favorites.push(body);
//   return Response.json(body, { status: 201 });
// }




import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";

export async function GET() {
  return Response.json(getAllFavorites());
}

export async function POST(request) {
  const body = await request.json();
  const result = addFavorite(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}