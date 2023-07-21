import { queryDB } from "../../../database";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    const query = "SELECT * FROM bookings WHERE court_id = ? AND date = ?";
    const values = [courtId, date];
  
    try{
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    }catch(e){
        return Response.json({message: e.message});
    }
}

export async function POST(request){
    const body = await request.json()
    const query = `INSERT INTO bookings(court_id, user_id, date, selected_times) VALUES (?, ?, ?, ?)`;
    const values = body.booking;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}
