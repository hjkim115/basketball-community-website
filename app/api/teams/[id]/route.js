import { queryDB } from "@/database";

export async function GET(request, {params}) {
    const id = params.id

    const query = `SELECT * FROM teams WHERE id = ?`;
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
  const query = "UPDATE teams SET total_match_count = ?, won_match_count = ?, winning_percentage = ? WHERE id = ?"
  const values = body.values;
  values.push(id);

  try {
      const data = await queryDB(query, values, "execute");
      return Response.json(data);
  } catch (e) {
      return Response.json({ message: e.message });
  }
}
