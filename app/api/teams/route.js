import { queryDB } from "../../../database";

export async function GET(request) {
    const query = "SELECT * FROM teams";
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
    const query = `INSERT INTO teams(name, description, sex, level, manager, total_match_count, won_match_count, winning_percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = body.team;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}