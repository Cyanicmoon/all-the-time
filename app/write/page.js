import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write(){

    let session = await getServerSession(authOptions);
    if (!session){
        return <div>로그인이 필요합니다</div>
    }

    return(
        <div>
            <div className="post-container" style={{paddingBottom:"10px"}}>
                <div className="post-container-main" style={{border:"0", marginBottom:"0"}}>
                    <div className="post-container-header" >
                            <h2 style={{marginTop:"10px", fontSize:"30px"}}>게시글 작성</h2>
                    </div>

                    <div className="add-container-content">
                        <form action="/api/post/add" method="POST">
                            <input type="text" name="title" placeholder="제목을 입력하세요" ></input>
                            <textarea name="content" placeholder="내용을 입력하세요"></textarea>
                            <button type="submit">✉️ 발행</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}