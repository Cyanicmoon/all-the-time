'use client'

import { SessionProvider } from "next-auth/react";

export default function AuthContext(){
    return <SessionProvider></SessionProvider>
}