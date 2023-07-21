import { queryDB } from "../../../database";

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO users(id, email, user_name, is_admin) VALUES (?, ?, ?, ?)`;
    const values = body.user;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json({message: "Successfully Posted Orders!"});
    } catch (e) {
        return Response.json({ message: e.message });
    }
}

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    const query = `SELECT * FROM users WHERE id = ?`;
    const values = [id];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data[0]);
    }catch(e){
        return Response.json({message: e.message});
    }
}