"use client"
export default function SignIn() {
  return (
    <div>
        <p>its under (auth) folder so it will be wrapped in the layout defined in (auth) folder</p>
        <p>but nextjs will ignore (auth) while routing</p>
        <div className="mt-4 mb-10">
        <input placeholder="email" type="text"/>
        <input placeholder="password" type="password"/>
        <button onClick={()=>{
          alert("sign in")
        }}>Sign In</button>
        </div>
    </div>
  );
}