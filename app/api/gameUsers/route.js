import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const gameId= searchParams.get("gameId");

    const query = `SELECT * FROM game_users WHERE game_id = ?`;
    const values = [gameId];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO game_users(game_id, user_id) VALUES (?, ?)`;
    const values = body.gameUser;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}
