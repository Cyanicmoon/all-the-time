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
        let check = true;
        try {
            if (request.body.isChecked == "on"){
                check = false;
                delete request.body.isChecked;
                request.body.noname = true;
            }
        }
        catch(e){}
        
        if (check) request.body.noname = false;
        
        const db = (await connectDB).db("community");

        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const koreaTimeDiff = 9 * 60 * 60 * 1000;
        const korNow = new Date(utc+koreaTimeDiff);

        let format = korNow.getFullYear() + '년 ' 
        + ('0'+(korNow.getMonth()+1)).slice(-2) + '월 '
        + ('0'+korNow.getDate()).slice(-2) + '일 - ' 
        + ('0'+korNow.getHours()).slice(-2) + ':' 
        + ('0'+korNow.getMinutes()).slice(-2) + ':'
        + ('0'+korNow.getSeconds()).slice(-2) + '';

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