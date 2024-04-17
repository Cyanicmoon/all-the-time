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
                            <div className="add-container-flex">
                                <pre>익명 기능을 사용할 때, 위험한 내용이나 남을 비방하는 내용의 글은 작성하지 말아주세요.</pre>
                                <p>익명</p>
                                <input name="isChecked" type="checkbox"></input>
                                <button type="submit">✉️ 발행</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}