"use client";
import {Input} from '@repo/ui/input'
import { useRouter } from 'next/navigation';
// after creating the Input component in the ui package, you need to export it in the package.json of that package 
// we need the give the export name in the from '' path and the function name in the {} of the import statement

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new chat app.</p>
      <Input onChange={()=>{alert("hi")}} placeholder="Type here" />
      <button style={{
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "100%",
        marginBottom: "10px"
      }} onClick={
        () => {
          router.push('/chat/123');
        }
      }>join room</button>
    </div>
  );
}