export default function SignIn() {
    return (
      <div>
          <p>its under (auth) folder so it will be wrapped in the layout defined in (auth) folder</p>
          <p>but nextjs will ignore (auth) while routing</p>
          <div className="mt-4 mb-10">
          <input className="m-2 p-1" placeholder="email" type="text"/>
          <input className="m-2 p-1" placeholder="password" type="password"/>
          <button className="m-2 p-2">Sign Up</button>
          </div>
      </div>
    );
  }