import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const matchId = searchParams.get("matchId");
    const query = `SELECT teams.id, teams.name, teams.total_match_count, teams.won_match_count, winning_percentage
                    FROM match_teams
                    INNER JOIN teams 
                    ON match_teams.team_id = teams.id 
                    WHERE match_id = ?`;
    const values = [matchId];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}