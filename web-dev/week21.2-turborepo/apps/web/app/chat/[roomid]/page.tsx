import { Input } from "@repo/ui/input";

export default async function chat({ params }:any) {
  const roomid = (await params).roomid; //nextjs way to get the dynmic parameter from the url

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          padding: "16px",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "80%",
          width: "45%",
          background: "#ff5733",
        }}
        >
        <div style={{
          marginBottom: "24px",
            height:"75%",
            width:"100%",
            border:"1px solid #ccc",
            background:"white",
            padding:"10px",
            
        }}>welcome to the room {roomid}</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "25%",
          }}
        >
            <Input placeholder="enter the message"/>
            <button style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
                marginBottom: "10px"
              }}>send</button>
        </div>
      </div>
    </div>
  );
}
