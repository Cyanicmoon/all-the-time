import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";


export const revalidate = 60; // 첫 방문시 캐싱

export default async function Home() {

  return (
    <div>test</div>
  );
}
