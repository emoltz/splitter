
interface InputProps {
    placeholder: string;
    inputType: string;
}



export default function Input({placeholder = "Enter text here...", inputType}: InputProps) {
    if (inputType == "") {
        inputType = "text";
    }

    return (

        <input
            type={inputType}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder={placeholder}
            pattern={inputType === "number" ? "^\\$?\\d+(\\.\\d{0,2})?$" : undefined}


        />
    );
}