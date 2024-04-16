"use client"

import { useEffect, useState } from "react"
import Loading from "../loading";

export default function ScheduleInfo(){

    let [data, setData] = useState([]);
    let [grade, setGrade] = useState(2);
    let [clas, setClas] = useState(3);
    let [check, setCheck] = useState(false);

    useEffect(()=>{
        setCheck(true);
        fetch("/api/schedule/get", {
            method : "POST",
            body : JSON.stringify({
                grade : grade,
                class : clas
            })
        })
        .then(r=>r.json())
        .then((result)=>{
            setData(result);
            setCheck(false);
        })
        .catch((e)=>{
            
        })
    }, [])

    return(
        <div>

        {
            check == false ? 
            <div className="schedule-container">
            <div className="schedule-info">
                <div className="schedule-find">
                    <input type="number" min={1} max={3} value={grade} onChange={(e)=>{
                        if (e.target.value > 3 || e.target.value < 0 || e.target.value % 1 != 0) return;
                        setGrade(e.target.value);
                    }}></input>
                    <p>학년</p>
                    <input type="number" min={1} max={6} value={clas} onChange={(e)=>{
                        if (e.target.value > 6 || e.target.value < 0 || e.target.value % 1 != 0) return;
                        setClas(e.target.value);
                    }}></input>
                    <p>반</p>
                    <button onClick={()=>{
                        if (grade == "" || clas == "") return

                        setCheck(true);
                        fetch("/api/schedule/get", {
                            method : "POST",
                            body : JSON.stringify({
                                grade : grade,
                                class : clas
                            })
                        })
                        .then(r=>r.json())
                        .then((result)=>{
                            setData(result);
                            setCheck(false);
                        })
                        .catch((e)=>{
                            
                        })
                    }}>🔍 검색</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><p>월</p></td>
                            <td><p>화</p></td>
                            <td><p>수</p></td>
                            <td><p>목</p></td>
                            <td><p>금</p></td>
                        </tr>
                        {/* 언젠간.. 수정할게요 :) */}
                        <tr>
                            <td><p>1교시</p></td> 
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][0].subject}</p>{data[i][0].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>2교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][1].subject}</p>{data[i][1].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>3교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][2].subject}</p>{data[i][2].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>4교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][3].subject}</p>{data[i][3].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>5교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][4].subject}</p>{data[i][4].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>6교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][5].subject}</p>{data[i][5].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <td><p>7교시</p></td>
                            {
                                data.map((a, i)=>{
                                    return(
                                        <td key={i}><p>{data[i][6].subject}</p>{data[i][6].teacher + "*"}</td>
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>:<Loading></Loading>
        }
        </div>
    )
}