import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    const query = `SELECT teams.id, teams.name, teams.manager
                    FROM team_users 
                    INNER JOIN teams 
                    ON team_users.team_id = teams.id 
                    WHERE user_id = ? AND status = "Accepted";`;
    const values = [userId];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO team_users(team_id, user_id, status) VALUES (?, ?, ?)`;
    const values = body.teamUser;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json({message: "Successfully Posted Orders!"});
    } catch (e) {
        return Response.json({ message: e.message });
    }
}