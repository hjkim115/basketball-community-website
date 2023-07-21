import { queryDB } from "@/database";

export async function GET(request, {params}) {
    const id = params.id

    const query = `SELECT * FROM matches WHERE id = ?`;
    const values = [id];

    try{
      const data = await queryDB(query, values, "execute");
      return Response.json(data[0]);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function PUT(request, {params}){
  const id = params.id;
  const body = await request.json()
  const query = " UPDATE matches SET winning_team = ? WHERE id = ?"
  const values = [body.team, id];

  try {
      const data = await queryDB(query, values, "execute");
      return Response.json(data);
  } catch (e) {
      return Response.json({ message: e.message });
  }
}