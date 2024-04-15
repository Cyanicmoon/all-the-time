import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Comment from "../../component/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Joayo from "@/app/component/Joayo";

export default async function Detail(props){

    let session = await getServerSession(authOptions);
    if (!session){
        return <div>로그인이 필요합니다</div>
    }

    const db = (await connectDB).db("community");
    let post = await db.collection("post").findOne({ _id : new ObjectId(props.params.post_id)})

    const db2 = (await connectDB).db("account");

    let temp, user_name, user_img;

    try {
        temp = await db2.collection("users").findOne({ email : post.author });
        user_name = temp.name;
        user_img = temp.image;
        console.log(user_name)
    }
    catch(e){
        return(
            <div style={{display: "flex", justifyContent: "center", alignItems:"center", height:"100%"}}><h1>여기 페이지 없어요 :D</h1></div>
        )
    }
    
    return(
        <div>
            <div className="post-container">
                <div className="post-container-main">
                    <div className="post-container-header">
                        <img src={ user_img }></img>
                        <div className="post-container-temp">
                            <h2>{ user_name }</h2>
                            <p>{ post.date }</p>
                        </div>
                        <Joayo _id={post._id.toString} good={post.good}></Joayo>
                        <button>👍 공감 { post.good }</button>
                    </div>

                    <div className="post-container-content">
                        <h1>{ post.title }</h1>
                        <pre>{ post.content }</pre>
                    </div>
                </div>
                <Comment _id={post._id.toString()}></Comment> 
            </div>

        </div>
    )
}