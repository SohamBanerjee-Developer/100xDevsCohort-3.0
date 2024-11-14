const express = require("express");
const app = express();// create an app instance of express
app.use(express.json())// explained in week 5.2 00:46:30 -> parsing the data in json->specifying which type of data is being send through body
 let users = [
  {
    userId: 1,
    name: "soham",
    todos: [
      {
        id: 1,
        title: "hello",
      },
      { id: 2, title: "testing  a demo" },
    ],
  },
  {
    userId: 2,
    name: "Haikirat",
    todos: [
      {
        id: 1,
        title: "hii",
      },
      { id: 2, title: "testing  another demo" },
    ],
  },
];


let userId = 3;
let ID = 3;
app.post("/", function (req, res) {//route handelers
  // usually send data in post request through body
  const user = req.body.name;
  const title = req.body.todos.map((todo)=>{
    return {
      id: ID++,
      title: todo.title}
  });
  users.push({
    userId,
    name: user,
    todos: title
  });
  res.send(title)
  userId++;
});
app.delete("/", function (req, res) {
 let userID = req.body.userID
 let todoID = req.body.todoID
  users = users.filter((user) => {
    if(todoID){
      user.todos = user.todos.filter((todo)=>todo.id!=todoID)
    }
    return user.userId != userID});
  res.send(users)
});
app.get("/", function (req, res) {
  //const a = req.query.n; // accessing the query parameter
  const Users = users.map((user) => {
    user.name;
    return { name: user.name, todos: user.todos.map((todo) => todo.title) }; // here user.name is not same as name that's why I needed to specify name and todos
  });
  const Todos = users.map((user) => user.todos.map((todo) => todo.title));
  res.json(Users); // this code will execute if there is a get request on the / route
  //res.send("<b>hello</b>")// you can send res.send only once
});

app.listen(3000);
