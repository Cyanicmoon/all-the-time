'use client'

import Link from "next/link";

export default function ListItem(props){
    // console.log("!!");

    // console.log(props.post);

    return(
        <div>
            {
                props.post.map((a, i)=>{
                    return (
                        <div className="list-item" key={i}>
                            <div className="list-item-profile">
                                <img src={props.user_img[i]}></img>
                                <p>{props.user_name[i]}</p>
                            </div>

                            <Link href={"/detail/"+props.post[i]._id} prefetch={false}>
                                <h4>{props.post[i].title}</h4>
                            </Link>
                            {/* <Link href={"/edit/"+props.post[i]._id} prefetch={false}>✏️ 수정</Link>
                            <br></br>
                            <span onClick={(e)=>{
                                fetch("/api/post/delete", {
                                    method : "POST",
                                    body : props.post[i]._id
                                })
                                
                                .then((r)=>{
                                    if (r.status == 200){
                                        alert("글 삭제 성공");
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(()=>{
                                            e.target.parentElement.style.display = "none";
                                        }, 1000);
                                    }
                                    else{
                                        alert("글 삭제 실패");
                                        //서버 에러 발생시 실행
                                    }
                                })
                                .then((r)=>{
                                    //성공시 실행
                                    
                                })
                                .catch((error)=>{
                                    //인터넷 문제로 실패시 실행
                                    console.log(error)
                                })


                                // fetch("/api/abc/lati")
                            }}>🗑️ 삭제</span> */}
                            <p>{props.post[i].date}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}