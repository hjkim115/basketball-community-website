import { queryDB } from "../../../database";

export async function GET(request) {
    const query = `SELECT * FROM courts`;
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
    const query = `INSERT INTO courts(name, district, location, type, size, open_time, close_time, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = body.court;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}