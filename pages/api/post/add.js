import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response){
    let session =  await getServerSession(request, response, authOptions);

    if (!session){
        return response.status(401).json("로그인이 필요합니다");
    }

    if (request.method != "POST"){
        return response.status(500).json("INVALID ACCESS");
    };
    
    console.log(request.body);

    if (request.body.title == ""){
        return response.status(500).json("제목을 입력해주세요")
    }

    try{
        
        const db = (await connectDB).db("community");

        let today = new Date(); 
        let format = today.getFullYear() + '년 ' 
        + ('0'+(today.getMonth()+1)).slice(-2) + '월 '
        + ('0'+today.getDate()).slice(-2) + '일 - ' 
        + ('0'+(today.getHours()+9)).slice(-2) + ':' 
        + ('0'+today.getMinutes()).slice(-2) + ':'
        + ('0'+today.getSeconds()).slice(-2) + '';

        let temp = request.body;
        temp.good = 0;
        temp.author = session.user.email;
        temp.date = format;
        console.log(temp);

        
        let post = await db.collection("post").insertOne(temp)

        return response.status(200).redirect("/list");
    }
    catch(e){
        return response.status(500).json("BOOM")
    }
}