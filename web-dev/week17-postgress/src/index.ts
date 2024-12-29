import { Client } from "pg";
import express from "express";
const pgClient = new Client(
  "postgresql://neondb_owner:qYgDJFmr2Q7X@ep-fancy-flower-a53gsmzz.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("in the signup route");

  const { username, email, password, city, pincode, street, country } = req.body;
  try {
    console.log(username + " " + email + " " + password);

    const insertQuery = `INSERT INTO users(username, email,password ) VALUES ($1,$2,$3) returning id`; //the values should be withing '' or ""
    const insertValues = [username, email, password];
    //the query and values reach the database seperately the query get executed and takes the
    //values while executed, although password is itself a sql but
    //its not appended to the query so its not executed
    console.log(insertQuery);
    const response = await pgClient.query(insertQuery, insertValues);
    console.log(response);
    
    await pgClient.query('BEGIN;')//begining the transaction

    const addressQuery = `INSERT INTO addresses(city, country,pincode, street, user_id) VALUES ($1,$2,$3,$4,$5)`
    const userId = response.rows[0].id // the query will try create the entry so we wil get the userId even if the transaction fails
    const addressQueryValues = [city, country, pincode, street, userId]
    const addressQueryResponse = await pgClient.query(addressQuery, addressQueryValues)

    await pgClient.query('COMMIT;')

    res.send("you are signed up");
  } catch (error) {
    console.log("in the error block");

    res.json({
      message: " error signing up ",
      error,
    });
  }
});

app.get('/metadata', async (req,res)=>{
  const id = req.query.id
  const getQuery = "SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.id = $1;"//a way of representig addresses table with a and users table with u
  // JOIN(MxN) is computationally heavy operation and not always recommended
  const response = await pgClient.query(getQuery, [id])
  res.json({
    response: response.rows
  })
})

async function main() {
  await pgClient.connect();
  console.log("connected");
  // const response = await pgClient.query("update users set username='harkirat' where id = 6")
  // console.log(response.rows);
  app.listen(3000);
}
main();
