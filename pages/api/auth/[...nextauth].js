import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret : process.env.GOOGLE_SECRET,
    adapter : MongoDBAdapter(connectDB),

    // cookies : {
    //     domain: "ilovedimigo.kro.kr",
    //     sameSite: 'None',
    //     secure: true
    // }
};
export default NextAuth(authOptions); 
