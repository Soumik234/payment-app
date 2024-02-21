
import { useSearchParams } from "react-router-dom";
import {Appbar} from "../component/Appbar"
import {Balance} from "../component/Balance"
import { Users } from "../component/Users";
export const Dashboard=()=>{
    return <div className="m-5">
        
        <Appbar />
        <Balance/>
        <Users/>


            
    </div>
}