import { atomFamily } from "recoil";
import TODOS from "../../assets/todos"

export const todosAtomFamily = atomFamily({
    key:"todos",
    default: id =>{
        return TODOS.find(x=> x.id === id)
    }// this function will find the todo from TODOS.JS based on the id which which become the default 
    // and an atom will be created based on that atom
})
// When you call atomFamily() it will return a function which provides the RecoilState atom based on the parameters you pass in.
// You only need to provide a single key for the atom family and it will generate a unique key for each underlying atom. 