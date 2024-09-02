import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({children}) {
  const { data: session } = useSession(); 
  
  if (session) {
    return (    
      <>
        <div className="bg-blue-900 min-h-screen flex">
          <Nav/>
          <div className="bg-white flex-grow p-2 rounded-md">{children}</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full text-white">
          <button onClick={async() => {await signIn('google')}} className="bg-white text-black p-2 px-4 rounded-lg">Login With Google</button>
        </div>
      </div>
    </>
  );
}