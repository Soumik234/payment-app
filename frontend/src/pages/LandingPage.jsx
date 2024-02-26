import { Navbar } from "../component/Navbar";

export const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <div className="grid place-items-center h-screen mt-[-80px]">
    <h2 className="font-extrabold text-5xl lg:text-6xl tracking-[-1px] text-center animated-text">
        Pay In a
        <br />
      <span className="text-clr-accent">Flash of an eye</span>
    </h2>
    </div>
    </>
  );
};

