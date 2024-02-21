import React, { useState, useEffect } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/v1/account/balance";

                const response = await axios.post(
          apiUrl,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const fetchedBalance = response.data.balance;
        const roundedBalance = Number(fetchedBalance.toFixed(2));
        setBalance(roundedBalance);
      } catch (error) {
        console.error(
          "Error fetching balance:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">
        Rs {balance !== null ? balance : "Loading..."}
      </div>
    </div>
  );
};
