'use client'

import { signOut } from "next-auth/react"

export default function LogoutBtn(){
    return(
        <button className="navbar-user-logout" onClick={()=>{ signOut() }}>로그아웃</button>
    )
}