import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const matchId = searchParams.get("matchId");
    const query = "SELECT * FROM match_teams WHERE match_id = ?"
    const values = [matchId];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO match_teams(match_id, team_id) VALUES (?, ?)`;
    const values = body.matchTeam;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
} 