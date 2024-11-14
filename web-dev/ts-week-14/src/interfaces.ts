interface Address{
	city?: string;
	country: "India";
	pincode: number
}

interface user{// interfaces are used to define custom type u can use it to give type object
	firstname: "harkirat"|"number";
	age: number;
	address?: Address
}
const User: user = {
	firstname: "harkirat",
	age: 21,
	address: {
		country: "India",// you can restrictthe  type of any variable/objects or anything else to a pecific values
		pincode: 4000000
	}
}
interface people{
	age: number;
	name: string;
	greet: ()=>string;
}
interface MANAGER{
	age: number;
	name: string;
	// greet: ()=>string;
}
let person = {
	age: 12,
	name: "soham",
	greet: function(){
		return "soham"
	},
	asd: "asd"
}
let PERSON: people = person//you can add extra properties
class People implements people{//implementing interface
	name= "string";
	age= 12;
	greet= () => "string";
}
class Manager implements MANAGER{
	// name: string;
	// age: number;
	pincode: number;// you can add extra things that does not exist in the implemented interface
	constructor(public name: string,public age: number){
		this.age = age
		this.name = name
		this.pincode = 70040
	}
}
let p = new People()
let M = new Manager("soham", 12)
console.log(p.greet());
console.log(M.age);
console.log(M);
//implenting an interface gives the class a blueprint of should the class have
// and extending another class give the child class the properties of the parent class we can accesss those properties through child class's object

abstract class animal{
	name: string;
	constructor(name: string){
		this.name = name
	}
	abstract greet(): string
	
	bye(){//these are methods  => functions defined in class has some syntactical difference from functions
		console.log("hello");
		
	}
}

class cat extends animal{
	name: string;
	greet(){
		return "hello human"
	}
	constructor(name: string){
		super(name)// derived class's constructor needs to have a super call
		this.name =name
	}
}
let kitty = new cat("chuni")
kitty.greet()
kitty.bye()
//unlike interfaces abstract classes can have default/non abstract properties and method