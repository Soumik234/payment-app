import { useSearchParams } from "react-router-dom";
import { Heading } from "../component/Header";
import { InputBox } from "../component/InputBox";
import axios from "axios";
import { useState } from "react";

export const Send = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(true);
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
          <InputBox placeholder={"Enter Amount"} label="Amount (in Rs)" onChange={(e)=>setAmount(e.target.value)}/>
          <button
            onClick={() => {
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
              .then((response) => {
                // Handle successful payment
                console.log(response.data); // You might want to inspect the response for more details
                setPaymentStatus(true);
              })
              .catch((error) => {
                // Handle payment failure
                console.error("Payment failed:", error);
                setPaymentStatus(false);
              });
            }}
            type="button"
            className="w-full h-9 px-6 text-indigo-100 transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-800 mt-2 mb-7">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};
