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
    }, []) // [] : 1회만 실행

    return(
        <div className="post-container-comment">
            
            {
                data.length > 0 ?
                data.map((a, i)=>{
                    return(
                        <pre key={i}>{a.content}</pre>
                    )
                })
                : null //<Loading></Loading>
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
                        setData(result);
                    })
            }}>✏️ 전송</button>
            </div>
        </div>
    )
}