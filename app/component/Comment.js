"use client"

import Loading from "@/app/loading";
import { useEffect, useState } from "react"

export default function Comment({_id}){

    let [comment, setComment] = useState("");
    let [data, setData] = useState([]);

    useEffect(()=>{
        fetch("/api/comment/list", {
            method : "POST",
            body : _id.toString()
        })
        .then(r=>r.json())
        .then((result)=>{
            setData(result);
        })
        .catch((e)=>{

        })
    }, []) // [] : 1회만 실행

    return(
        <div className="post-container-comment">
            
            {
                data.length > 0 ?
                data.map((a, i)=>{
                    return(
                        <div className="comment-container" key={i}>
                            <div className="comment-container-header">                               
                                <img src={ a.user_img }></img>
                                <h2>{ a.user_name }</h2>
                            </div>
                            <div className="comment-container-content">
                                <pre>{ a.content }</pre>
                                <p>{ a.date }</p>
                            </div>
                        </div>
                    )
                })
                : null
            }
            
            <div className="post-container-comment-input">
                <textarea onChange={(e)=>{
                    setComment(e.target.value);
                    e.target.style.height = e.target.scrollHeight + "px";
                }} rows={1} placeholder="댓글을 입력하세요"></textarea>
                <button onClick={()=>{
                    let rr = confirm("댓글을 입력하시겠습니까?");
                    if (!rr) return;
                    fetch("/api/comment/add", {
                        method : "POST",
                        body: JSON.stringify({
                            comment : comment,
                            _id : _id
                        })
                    })
                    .then(r=>r.json())
                    .then((result)=>{
                        console.log(result)
                        if (result != "error"){
                            setData(result);
                            alert("댓글이 작성되었습니다");
                        }
                        else{
                            alert("내용을 입력해주세요");
                        }

                        let temp = document.querySelector(".post-container-comment-input textarea");
                        temp.value = "";
                    })
                    .catch((e)=>{

                    })
            }}>✏️ 전송</button>
            </div>
        </div>
    )
}