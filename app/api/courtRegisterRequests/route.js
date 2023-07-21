import { queryDB } from "../../../database";

export async function GET(request) {
    const query = "SELECT * FROM court_register_requests";
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
    const query = `INSERT INTO court_register_requests(location, contact_no, status) VALUES (?, ?, ?)`;
    const values = body.request;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}

export async function PUT(request){
    const body = await request.json()
    const query = " UPDATE court_register_requests SET status = ? WHERE id = ?"
    const values = body.values;

    try {
        const data = await queryDB(query, values, "execute");
        return Response.json(data);
    } catch (e) {
        return Response.json({ message: e.message });
    }
}
