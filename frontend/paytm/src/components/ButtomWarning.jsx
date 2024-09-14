import {link} from "react-router-dom"

export function ButtomWarning({label}, bttonText ,to) {
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
        </link>
    </div>
}