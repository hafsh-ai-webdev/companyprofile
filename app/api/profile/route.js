const myProfile = {
    name: "Siti Hafsoh",
    role: "peserta bootcamp",
    favoriteTech: ["Next.js", "Tailwind CSS", "REST API"]
};

export async function GET() {
    return Response.json(myProfile);
}