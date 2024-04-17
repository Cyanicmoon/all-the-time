import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(request, response){
    if (request.method != "POST"){
        return response.status(500).json("INVALID ACCESS");
    }

    let session = await getServerSession(request, response, authOptions);
    if (!session){
        return response.status(401).json("로그인이 필요합니다");
    }

    try {
        const db = (await connectDB).db("community");
        let post = await db.collection("post").findOne({ _id : new ObjectId( request.body._id )});
        
    }
    catch(e){
        return response.status(500).json("BOOM")
    }
}