let X = 1//type inferencing
let x: number|string = 1
x = " harkirat"
console.log(x);

function greeting(firstname: string){
console.log("heloo " + firstname);}

greeting("soham")
function sum( num1: number, num2:number){
    return num1+num2///return explicitly has boolean type
}
let answer = sum(1,2)
console.log(answer);

// dont give type any if you want a variable to acccess to multiple types of value give it multiple types
function isLegal(age: number): boolean{//giving the return of the function type
    if(age>18){
        return true//return implicitly has boolean type
    }
    else{
        return false///return implicitly has boolean type
    }
}
let a = isLegal(12)
console.log(a)
function delayedCall(fn: (() => void)|((a: boolean)=>number) ) {// giving callbeck function a type
    setTimeout(fn, 1000);
}

delayedCall(function() {
    console.log("hi there");
})

function greet(user: {
    name: "soham",
    age:number,
    address :{
        city: string,
        pincode: number
    }
}): void{
    console.log("hello" + user.address.city);
    
}
let user:  {
    name: "soham",
    age:number,
    address :{
        city: string,
        pincode: number
    }
} ={
    name: "soham",
    age: 12
}
