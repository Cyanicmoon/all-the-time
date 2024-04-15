import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function Detail(props){

    const db = (await connectDB).db("community");
    let post = await db.collection("post").findOne({ _id : new ObjectId(props.params.post_id)})

    let session = await getServerSession(authOptions);
    if (!session){
        return <div>로그인이 필요합니다</div>
    }
    if (session.user.email != post.author){
        return <div>잘못된 접근입니다</div>
    }

    // await db.collection("post").updateOne({ _id : new ObjectId(props.params.post_id) }, 
    //     {$set : { title : '', content : '' }}
    // )

    // console.log(post)
    return(
        // <div className="p-20">
        //     <h4>글 수정</h4>
        //     <form action="/api/post/edit" method="POST">
        //         <input name="title" placeholder="제목을 입력하세요" defaultValue={post.title}></input>
        //         <textarea name="content" placeholder="내용을 입력하세요" defaultValue={post.content}></textarea>
        //         <input style={{display: "none"}}name="_id" defaultValue={post._id.toString()}></input>
        //         <button type="submit">작성</button>
        //     </form>
        // </div>

        <div>
        <div className="post-container" style={{paddingBottom:"10px"}}>
            <div className="post-container-main" style={{border:"0", marginBottom:"0"}}>
                <div className="post-container-header" >
                        <h2 style={{marginTop:"10px", fontSize:"30px"}}>게시글 수정</h2>
                </div>

                <div className="add-container-content">
                    <form action="/api/post/edit" method="POST">
                        <input type="text" name="title" placeholder="제목을 입력하세요" defaultValue={post.title}></input>
                        <textarea name="content" placeholder="내용을 입력하세요" defaultValue={post.content}></textarea>
                        <input style={{display: "none"}}name="_id" defaultValue={post._id.toString()}></input>
                        <button type="submit">✏️ 수정</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}