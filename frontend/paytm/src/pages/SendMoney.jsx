import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div>
        <div>
            <div>
                <div>
                    <h2>Send Money</h2>

                </div>
                <div class="p-6">
                    <div class="flex item-center space-x-4" >
                        <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center" >
                            <span calas="text-2x1 text-white" >{name[0].toUpperCase()}</span>

                        </div>
                        <h3 class="text-2x1 font-semibold" >{name}</h3>
                    </div>
                    <div class="space-y-4" >
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                type="number"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                        }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}