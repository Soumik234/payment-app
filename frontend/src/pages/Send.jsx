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
  return (
    <div className="bg-gray-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Send Money" />
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">
                {name ? name[0].toUpperCase() : ""}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>
          <InputBox placeholder={"Enter Amount"} label="Amount(in Rs)" onChange={(e)=>setAmount(e.target.value)}/>
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
              );
            }}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Green
          </button>
        </div>
      </div>
    </div>
  );
};
