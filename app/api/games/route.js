import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const date = searchParams.get("date");

    const query = `SELECT * FROM games WHERE date = ?`;
    const values = [date];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO games(title, description, date, time, district, location, level, sex, max_player) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = body.game;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}
