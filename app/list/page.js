import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "../component/listItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SplitNumber from "../component/SplitNumber";

export const dynamic = 'force-dynamic';

export default async function List(){

    const db1 = (await connectDB).db("community");
    let post = await db1.collection("post").find().sort({"date" : -1}).toArray();
    for (let i=0; i<post.length; i++){
        post[i]._id = post[i]._id.toString();
    }

    const db2 = (await connectDB).db("account");
    let user_name = new Array(0);
    let user_img = new Array(0)
    for (let i=0; i<post.length; i++){
        let temp = await db2.collection("users").findOne({ email : post[i].author });
        user_name.push(temp.name)
        user_img.push(temp.image);
    }

    let session = await getServerSession(authOptions);

    return(
        <div>
            <div className="list-bg">
                <div className="list-enter">
                    <div className="list-temp">
                        {/* <div className="list-enter-box">
                            <input type="text" placeholder="글 제목을 입력하세요"></input>
                            <button>🔍</button>
                        </div> */}
                        <Link href="/write">✉️ 글쓰기</Link> 
                    </div>
                </div>
                <ListItem post={post} user_name={user_name} user_img={user_img} session={session}></ListItem>
                {/* <SplitNumber></SplitNumber> */}
            </div>
        </div>
    )
}