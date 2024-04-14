import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response){
    let session = await getServerSession(request, response, authOptions);

    if (request.method != "POST"){
        return response.status(500).json("INVALID ACCESS");
    }

    if (!session){
        return response.status(401).json("로그인이 필요합니다");
    }

    try {
        const db = (await connectDB).db("community");
        let comment = await db.collection("comment").find({ parent : request.body }).toArray();
        
        if (comment.length == 0){
            return response.status(200).json("");
        }

        return response.status(200).json(comment);
    }
    catch(e){
        return response.status(500).json("BOOM");
    }
}