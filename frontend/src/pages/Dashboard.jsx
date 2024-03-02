import { Appbar } from "../component/Appbar";
import { Balance } from "../component/Balance";
import { Users } from "../component/Users";
export const Dashboard = () => {
  return (
      <div className="m-10">
        <Appbar />
        <Balance text="Your balance:"/>
        <Users />
      </div>
  );
};
