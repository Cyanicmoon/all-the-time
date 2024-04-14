import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write(){

    let session = await getServerSession(authOptions);
    if (!session){
        return <div>로그인이 필요합니다</div>
    }

    return(
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/add" method="POST">
                <input name="title" placeholder="제목을 입력하세요"></input>
                <textarea name="content" placeholder="내용을 입력하세요"></textarea>
                <button type="submit">작성</button>
            </form>
        </div>

    )
}