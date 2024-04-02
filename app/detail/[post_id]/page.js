import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Comment from "../../component/Comment";

export default async function Detail(props){

    const db = (await connectDB).db("community");
    let post = await db.collection("post").findOne({ _id : new ObjectId(props.params.post_id)})

    const db2 = (await connectDB).db("account");

    let temp = await db2.collection("users").findOne({ email : post.author });
    let user_name = temp.name;
    let user_img = temp.image;

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