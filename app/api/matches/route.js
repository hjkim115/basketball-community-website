import { queryDB } from "@/database";

export async function GET(request) {
    const query = `SELECT * FROM matches`;
    const values = [];

    try{
      const data = await queryDB(query, values, "execute");
      return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
  const body = await request.json()
  const query = `INSERT INTO matches(date, time, district, location, sex) VALUES (?, ?, ?, ?, ?)`;
  const values = body.match;

  try {
      const data = await queryDB(query, values, "execute");
      return Response.json(data);
  } catch (e) {
      return Response.json({ message: e.message });
  }
}