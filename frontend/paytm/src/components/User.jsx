import { useEffect, useState } from "react";
import { Botton, Button } from "./Button";

import axios from "axios"
import { useNavigate } from "react-router-dom";

export const User = ()=>{
    const [ user, setUser ] = useState([]);
    cosnt [filter ,setFilter]= useState("");

    useEffect(()=>{
        axios.get("https://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response=>{
                setUsers(response.data.user)
            })
    },[filter])


    return <>
        <div className = "font-bold mt-6 text-lg">
            Users
        </div>
        <div>
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }}type="text " placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
         <div>
            {users.map(user => <User user={user} />)}
        </div>
    
    </>
}
function User({user}) {

    const navigate =useNavigate();

    return <div className= " flex justify-between">
                <div className="flex">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-x1" >
                            { user.firstName[0]}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col justify-center h-full">
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                    <div>
                        <Button onClick={(e)=>{
                            navigate("/send?=" + user.id + "&name= " + user.firstName);

                        }} label={"Send Money"}/>
                    </div>
                </div> 
            </div>
}