interface user{
    firstName: string;
    lastName: string;
    email: string;
    pincode: number,
    mobileNo: number    
}
type picekdUser = Pick <user, "firstName" | "lastName" | "email" >// it's a type  not a function doesn't have a runtime that'w why we are using generic   
const displayUserProfile = (user: picekdUser) => {
    console.log(`Name: ${user.firstName}, Email: ${user.email}`);
  };
  displayUserProfile({
    firstName: "soham",
    lastName: "Banerjee",
    email : " two@gmail.com"
  })
//a file without any top-level import or export declarations is treated as a script 
//whose contents are available in the global scope (and therefore to modules as well).
// but Modules are executed within their own scope, not in the global scope
// If you have a file that doesn’t currently have any imports or exports, but you want 
//to be treated as a module, add the line: export {};
//as ts documentation the syntax is borrowed from js, same syntax work in js