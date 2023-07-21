import { queryDB } from "@/database";

export async function GET(request, {params}) {
    const id = params.id

    const query = `SELECT * FROM games WHERE id = ?`;
    const values = [id];

    try{
      const data = await queryDB(query, values, "execute");
      return Response.json(data[0]);
    }catch(e){
        return Response.json({message: e.message});
    }
}
