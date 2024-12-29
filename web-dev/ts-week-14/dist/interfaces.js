"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = {
    firstname: "harkirat",
    age: 21,
    address: {
        city: "kolkata",
        country: "India", // you can restrictthe  type of any variable/objects or anything else to a pecific values
        pincode: 4000000
    }
};
let person = {
    age: 12,
    name: "soham",
    greet: function () {
        return "soham";
    },
    asd: "asd"
};
let PERSON = person; //you can add extra properties
class People {
    constructor() {
        this.name = "string";
        this.age = 12;
        this.greet = () => "string";
    }
}
class Manager {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.age = age;
        this.name = name;
        this.pincode = 70040;
    }
}
let p = new People();
let M = new Manager("soham", 12);
console.log(p.greet());
console.log(M.age);
console.log(M);
//implenting an interface gives the class a blueprint of should the class have
// and extending another class give the child class the properties of the parent class we can accesss those properties through child class's object
class animal {
    constructor(name) {
        this.name = name;
    }
    bye() {
        console.log("hello");
    }
}
class cat extends animal {
    greet() {
        return "hello human";
    }
    constructor(name) {
        super(name); // derived class's constructor needs to have a super call
        this.name = name;
    }
}
let kitty = new cat("chuni");
kitty.greet();
kitty.bye();
//unlike interfaces abstract classes can have default/non abstract properties and method
