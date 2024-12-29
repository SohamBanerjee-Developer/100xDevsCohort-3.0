import { PrismaClient } from "@prisma/client";
import client from "../lib/db"

//why create a seperate get endpoint when the server is same prisma, prisma client and corresponding prisma schema
//is in the the same code base.
async function getUserDetails() {
  try {
    const user = await client.user.findFirst({});
	  return {
      email: user?.email
    }
  }  catch(e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();//don't worry frontend won't be able to hit this function or db as
//we know this async function runs on the server and the server only returns the below html to the frontend

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                               
                {userData?.email}
            </div>
        </div>
    </div>
  );
}