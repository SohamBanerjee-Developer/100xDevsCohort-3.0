import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center items-center mb-8 text-2xl">
          welcome to uour todo app
        </div>
        <div className="flex justify-between items-center text-xl">
          <button className="bg-slate-900 px-6 py-4 rounded-lg">
            <a href="/SignIn">Sign In</a>
          </button>
          <button className="bg-slate-900 px-6 py-4 rounded-lg">
            <Link href="/SignUp">Sign Up</Link>{/*similar to a */}
          </button>
        </div>
      </div>
    </div>
  );
}
