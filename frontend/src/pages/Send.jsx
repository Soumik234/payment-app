import { useSearchParams } from "react-router-dom";
import { Heading } from "../component/Header";
import { InputBox } from "../component/InputBox";
import axios from "axios";
import { useState ,useEffect} from "react";
import { Balance } from "../component/Balance";

export const Send = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const handleSendMoney = () => {
    setIsLoading(true);
    axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: id,
        amount
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(() => {
      setPaymentStatus(true);
    })
    .catch((error) => {
      console.error("Payment failed:", error);
      setPaymentStatus(false);
    })
    .finally(() => { 
      setIsLoading(false);
    });
  }
  return (
    <div className="bg-gray-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Send Money" />
          <div className="flex items-center space-x-4 mt-10 mb-5">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {name ? name[0].toUpperCase() : ""}
              </span>
            </div>
            <h3 className="text-2xl font-bold ">{name}</h3>
          </div>
          <Balance text="Balance:"/>
          <br />
          <InputBox placeholder={"Enter Amount"} label="Amount (in Rs)" onChange={(e)=>setAmount(e.target.value)}/>
          <button
            onClick={() => {handleSendMoney()}}
            type="button"
            className="w-full h-9 px-6 text-indigo-100 transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-800 mt-2 mb-7">
            {isLoading ? "Loading..." : "Send Money"}
          </button>
          <div className="flex justify-center">
            {paymentStatus ? (
              <span className="text-green-500">Payment successful to {name}</span>
            ) : (
             ""
            )}
            </div>
        </div>
      </div>
    </div>
  );
};
