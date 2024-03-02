import { Heading } from "../component/Header";
import { BottomWarning } from "../component/BottomWarning";
import { Button } from "../component/Button";
import { InputBox } from "../component/InputBox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signin = ({ isVisible, toggleSignin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignin = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:3000/api/v1/user/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {isVisible && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center"
        >
          <div
            onClick={toggleSignin}
            className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"
          />
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-4  h-max px-6 relative z-50">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleSignin}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>

              <Heading label={"Sign In"} />
              <SubHeading
                label={"Enter your credential to access your account"}
              />
              <InputBox
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="soumik@gmail.com"
                label={"Email"}
              />
              <InputBox
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="****"
                label={"Password"}
              />
              <div className="pt-4">
                <Button
                  onClick={handleSignin}
                  label={loading ? "Loading..." : "Sign In"}
                />
              </div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign up"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
