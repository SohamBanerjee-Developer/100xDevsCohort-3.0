interface User{
    name: string
    age: number
}
interface admin{
    name: string
    ip: number
}
type client = User & admin
const soham: client ={
    name: "soham",
    age: 19,
    ip: 5463
}
interface USER{
    firstName: string
    lastName: string
    age: number
}
function isLegal(name: USER[]): boolean{// array of type user
    for(let i=0; i<name.length; i++){
        if(name[i].age>= 18){
            return true
        }else{
            return false
        }
    }
}
let user1: USER ={
    firstName: "soham",
    lastName: "banerjee",
    age: 19
}
let user2: USER={
    firstName: "harkirat",
    lastName: "singh",
    age: 10
}// SOMEhow accesing the interfaces of other .ts files
let users = [user1,user2]

let legal = isLegal(users)
if(legal){
    console.log("you can drink");
}else{
    console.log("ypu can't");
    
}
// you can acheive intersection using interfaces using extends