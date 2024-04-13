import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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

        if (session.user.email != post.author){
            return response.status(500).json("FAILED TO ACCESS");
        }

        if (request.body.title == ""){
            return response.status(500).json("제목을 입력해주세요")
        }

        let temp = {title : request.body.title, content : request.body.content}
        let edit = await db.collection("post").updateOne(
            { _id : new ObjectId(request.body._id) }, 
            {$set : temp}
        )

        return response.status(200).redirect("/list");
    }
    catch(e){
        return response.status(500).json("INVALID ACCESS")
    }
}