import { useNavigate } from "react-router-dom";
import { InputBox } from "./components/InputBox";
import { ButtomWarning } from "../components/Buttomwarning";

export const Signup = ()=> {
    const [ firstName , setFirstName ] = useState("");
    const [lastName , setLastName ] = useState("");
    const [ password ,setPassword ] = useState("");
    const [ userName ,setUserName ] = useState("");

    return <div>
        <InputBox onChange={e=>{
            setFirstName(e.target.value)
            }} placeholder= {"Chhitij"} label={"First Name"} />
        <InputBox onChange={e=> {
            setLastName(e.target.value);
        }} placeholder={"pradhan"} label={"Last Name"} />
        <InputBox onChange={e =>{
            setUserName(e.target.value);
        }} placeholder={"asd@gmail.com"} label={"Email"} /> 
        <InputBox onChange={e => {
            setPassword(e.target.value);
        }} placeholder={"12345"} label ={"Password"} />   
        <ButtomWarning label={"Already have an Account?" } buttonText={"Sign in "} to={"/Signin"} />
    </div>
}