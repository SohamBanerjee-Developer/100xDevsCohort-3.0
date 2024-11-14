import { atom, selector } from "recoil";
export const counter = atom({
    default: 0,
    key: "counter",
})
export const isEven = selector({
    key: "even",
    get: ({get})=>{
        const Counter = get(counter)
        return Counter%2
    }
})
