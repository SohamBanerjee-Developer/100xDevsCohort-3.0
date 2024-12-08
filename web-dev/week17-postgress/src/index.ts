import { Client } from "pg";
import express from "express";
const pgClient = new Client(
  "postgresql://neondb_owner:qYgDJFmr2Q7X@ep-fancy-flower-a53gsmzz.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("in the signup route");

  const { username, email, password } = req.body;
  try {
    console.log(username + " " + email + " " + password);

    const insertQuery = `INSERT INTO users(username, email,password ) VALUES ($1,$2,$3)`; //the values should be withing '' or ""
    const insertValues = [username, email, password];
    //the query and values reach the database seperately the query get executed and takes the
    //values while executed, although password is itself a sql but
    //its not appended to the query so its not executed
    console.log(insertQuery);
    await pgClient.query(insertQuery, insertValues);

    res.send("you are signed up");
  } catch (error) {
    console.log("in the error block");

    res.json({
      message: " error signing up ",
      error,
    });
  }
});

async function main() {
  await pgClient.connect();
  console.log("connected");
  // const response = await pgClient.query("update users set username='harkirat' where id = 6")
  // console.log(response.rows);
  app.listen(3000);
}
main();
