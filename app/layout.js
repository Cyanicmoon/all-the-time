import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image"
import LoginBtn from "./component/LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutBtn from "./component/LogoutBtn";
import { headers } from "next/headers";
import Options from "./component/Options";
// import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All the time",
  description: "디미고와 함께하세요",
};

export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions);
  
  return (
    // <AuthContext>
    <html>
      <body>
          <div className="navbar"> 
            <Link href="/" className="logo">
              <img src="/logo.png"></img>
              <div>
                <p>All the Time</p>
                <h3>한국디지털미디어고등학교</h3>
              </div>
            </Link> 
            
            <div className="navbar-nav">
              
              <Options></Options>

            </div>
            
            <div className="navbar-user">
              {
                await getServerSession(authOptions) == null ? <LoginBtn></LoginBtn>: <LogoutBtn></LogoutBtn>
              }

              <div className="navbar-profile">
                {
                  await getServerSession(authOptions) == null ? null : <img src={session.user.image}></img>
                }

              </div>
            </div>
          </div>
        
          {children}

      </body>
    </html>

    // </AuthContext>
  );
}
