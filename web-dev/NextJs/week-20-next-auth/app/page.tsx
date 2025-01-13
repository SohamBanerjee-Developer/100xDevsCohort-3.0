// "use client"//React Context is unavailable in Server Components
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

// using getServerSession fuction so the the session logic can be in server components
export default async function wrapperHome(){
  const session = await getServerSession()
// you will get the userdetails and based on that you can do db queries and show other details and all of it will be SSRed
  console.log(session);
  
  return   <div>
    {JSON.stringify(session)}{/* yo will see the data when you are signed in with a next_auth secret in the .env file */}
  </div>

}

