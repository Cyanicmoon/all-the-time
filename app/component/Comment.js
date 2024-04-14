"use client"

import Loading from "@/app/loading";
import { useEffect, useState } from "react"

export default function Comment({_id}){

    let [comment, setComment] = useState("");
    let [data, setData] = useState([]);
    // let [userName, setUserName] = useState([]);
    // let [userImg, setUserImg] = useState([])

    useEffect(()=>{
        fetch("/api/comment/list", {
            method : "POST",
            body : _id.toString()
        })
        .then(r=>r.json())
        .then((result)=>{
            setData(result);
            console.log(result);
        })
        .catch((e)=>{

        })
    }, []) // [] : 1회만 실행

    // await useEffect(()=>{
    //     fetch("/api/comment/getUser", {
    //         method : "POST",
    //         body : data.length
    //     })
    //     .then(r=>r.json())
    //     .then((result)=>{
    //         console.log(result);
    //     })
    //     .catch((e)=>{
            
    //     })
    // }, [])

    return(
        <div className="post-container-comment">
            
            {
                data.length > 0 ?
                data.map((a, i)=>{
                    return(
                        <div className="comment-container">
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
                }} rows={1}></textarea>
                <button onClick={()=>{
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