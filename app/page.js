import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


export const revalidate = 60; // 첫 방문시 캐싱

export default async function Home() {

  let session = await getServerSession(authOptions);

  return (
    <div>
      {
        session ?  <img src="/elmo_yes.gif" className="test-img"></img> : <img src="/elmo_no.gif" className="test-img"></img>
      }
    </div>
  );
}
