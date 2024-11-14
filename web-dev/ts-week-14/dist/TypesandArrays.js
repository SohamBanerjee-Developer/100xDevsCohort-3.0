"use strict";
const soham = {
    name: "soham",
    age: 19,
    ip: 5463
};
function isLegal(name) {
    for (let i = 0; i < name.length; i++) {
        if (name[i].age >= 18) {
            return true;
        }
        else {
            return false;
        }
    }
}
let user1 = {
    firstName: "soham",
    lastName: "banerjee",
    age: 19
};
let user2 = {
    firstName: "harkirat",
    lastName: "singh",
    age: 10
}; // SOMEhow accesing the interfaces of other .ts files
let users = [user1, user2];
let legal = isLegal(users);
if (legal) {
    console.log("you can drink");
}
else {
    console.log("ypu can't");
}
