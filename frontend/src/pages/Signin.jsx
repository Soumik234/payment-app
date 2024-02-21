import { Heading } from "../component/Header";
import { BottomWarning } from "../component/BottomWarning";
import { Button } from "../component/Button";
import { InputBox } from "../component/InputBox";
import { SubHeading } from "../component/SubHeading";

export const Signin = () => {
  return (
    <div className="bg-gray-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credential to access your account"} />
          <InputBox placeholder="soumik@gmail.com" label={"Email"} />
          <InputBox placeholder="****" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
