import { InputBox } from "./components/InputBox";
import { ButtomWarning } from "./components/ButtomWarning";
import { Button } from "./components/Button";



export const Signin = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div>
                <InputBox placeholder={"asdf@gmail.com"} label={"Username"} />
                <InputBox placeholer={"12334"} label={"Password"}/>
                <div>
                <Button label={"Sign in"} />    
                </div>
                <ButtomWarning label={"Don't have a, create Account ?"} buttonText={"Sign up "} to={"/Signup"} />
            </div>
        </div> 
    </div>
    
}