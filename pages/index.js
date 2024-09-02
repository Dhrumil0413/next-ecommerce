import { useSession } from "next-auth/react"
import Layout from "@/components/layout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between">  
        <h2 className="text-blue-900"> Hello, <b>{session?.user?.name}</b> </h2>

        <div className="bg-gray-400 flex justify-around gap-2 rounded-l-full rounded-r-full ">
          <span className="text-sm ml-2"> {session?.user?.name} </span>
          <img className="w-6 h-6 rounded-full" src={session?.user?.image} alt="" />
        </div>
      </div>
    </Layout>
  );
}
