
interface InputProps {
    placeholder: string;
    onChange?: (e: any) => void;
}

export function Input({placeholder, onChange}: InputProps) {

    return(
        <input onChange={onChange} type="text" placeholder={placeholder} style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "10px"
        }}/>
    )
}