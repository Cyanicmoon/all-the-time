import { connectDB } from "@/util/database";

export default async function handler(request, response){

    const db = (await connectDB).db("community");
    let post = await db.collection("post").find().toArray();

    if (request.method == "POST"){
        return response.status(200).json(post);
    }

    
}