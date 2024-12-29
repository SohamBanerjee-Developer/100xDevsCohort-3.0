import { ReactElement } from "react"


export interface Buttonprops {
    variant: "secondary" | "primary"
    size: "sm" | "md" | "lg"
    onClick: ()=>void
    startIcon?: ReactElement
    endIcon?: ReactElement
    text: string
}
//my approach
 function MyButton({variant, size, onClick, startIcon, endIcon, text}: Buttonprops){

    return(
        <>
        {variant == "secondary" ?(
            <button type="submit" className={(size == "sm" ? "w-32 h-14 p-2" : (size== "md"? "w-36 h-16 p-4": "w-40 h-20 p-6 ")) + " " +  "bg-purple-600 rounded-md m-4"}> {/*ternary operator should be inside () otherwise "bg-purple-600 rounded-md m-4" this will run when the consditon will not satisfy*/}
               {startIcon} {text}
            </button>
        ) : variant == "primary" ? (
            <button type="submit" className={(size == "sm" ? "w-32 h-14 p-2" : (size== "md"? "w-36 h-16 p-4": "w-40 h-20 p-6 ")) + " " +  "bg-white-200 rounded-md m-4"}>
              {startIcon}  {text}
            </button>
        ):null}
        </>
    )
}

// harkirat's approach more professional
const defaultstyles = "rounded-md m-2 flex justify-between items-center"

const variantStyles= {
    "primary": "bg-white-200",
    "secondary": "bg-purple-600"
}

const sizeStyles ={
    "sm": "h-12 w-28 py-1 px-4 ",
    "md": "h-14 w-32 py-3 px-6",
    "lg": "h-16 w-36 py-5 px-7"
}

export default function Button({variant, size, onClick, startIcon, endIcon, text}: Buttonprops){
    return <button type="submit" className={`${variantStyles[variant]} ${defaultstyles} ${sizeStyles[size]}  `}>
        {startIcon?<div>{startIcon}</div>:null}{text}
    </button>
}