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
        const db2 = (await connectDB).db("account");
        let user_name = new Array(0);
        let user_img = new Array(0)
        for (let i=0; i<request.body; i++){
            let temp = await db2.collection("users").findOne({ email : post[i].author });
            user_name.push(temp.name)
            user_img.push(temp.image);
        }
        
        let temp = {
            user_name : user_name,
            user_img : user_img
        }
        
        console.log(request.body);

        return response.status(200).json(temp);
    }
    catch(e){
        return response.status(500).json(e.message);
    }
}