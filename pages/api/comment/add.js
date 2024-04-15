import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response){
    let session = await getServerSession(request, response, authOptions);
    request.body = JSON.parse(request.body);

    if (request.method != "POST"){
        return response.status(500).json("INVALID ACCESS");
    }

    if (!session){
        return response.status(401).json("로그인이 필요합니다");
    }

    if (request.body.comment == ""){
        return response.status(500).json("error");
    }

    try {
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


        const db2 = (await connectDB).db("account");
        let t = await db2.collection("users").findOne({ email : session.user.email });

        let temp = {
            content : request.body.comment,
            parent : request.body._id,
            date : format,
            user_name : t.name,
            user_img : t.image
        }

        let comment = await db.collection("comment").insertOne(temp);
        comment = await db.collection("comment").find({ parent : request.body._id }).toArray();
        return response.status(200).json(comment);
    }
    catch(e){
        return response.status(500).json(e.message);
    }
}