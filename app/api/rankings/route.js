import { queryDB } from "../../../database";

export async function GET(request) {
    const query = "SELECT * FROM teams ORDER BY winning_percentage DESC, total_match_count DESC";
    const values = [];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}
