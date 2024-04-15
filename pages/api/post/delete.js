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
        let post = await db.collection("post").findOne({ _id : new ObjectId( request.body )});

        if (session.user.email != post.author){
            return response.status(500).json("FAILED TO ACCESS");
        }

        let result = await db.collection("post").deleteOne({
            _id : new ObjectId( request.body )
        })
        
        let comment = await db.collection("comment").find({ parent : request.body }).toArray();
        if (comment.length != 0){
            for (let i=0; i<comment.length; i++){
                let r = await db.collection("comment").deleteOne({
                    _id : new ObjectId( comment[i]._id )
                })
            }
        }

        if (result.deletedCount == 0){
            return response.status(500).json("FAILED TO ACCESS")
        }
        
        return response.status(200).redirect("/list");
    }
    catch(e){
        return response.status(500).json("BOOM")
    }
}