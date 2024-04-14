'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Options(){
    
    const pathname = usePathname();

    return(
        <div>
            {/* <div className="navbar-nav-item"> */}
            <Link href="/list" style={{ color : pathname == "/list" ? "red" : "black"}}>게시판</Link> 
            {/* </div> */}
            <Link href="/schedule" style={{ color : pathname == "/schedule" ? "red" : "black"}}>시간표</Link>
            <Link href="/meal" style={{ color : pathname == "/meal" ? "red" : "black"}}>급식 정보</Link>
        </div>
    )
}