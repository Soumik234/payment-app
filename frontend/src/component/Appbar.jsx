import { useEffect , useState} from "react";
import axios from "axios";

export const Appbar = () => {
    const [name, setName] = useState("");
  
    useEffect(() => {
      const fetchName = async () => {
        try {
          const apiUrl = "http://localhost:3000/api/v1/user/firstname";
  
                  const response = await axios.post(
            apiUrl,{},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          
          const fetchedName = response.data.firstName;
          setName(fetchedName);
        } catch (error) {
          console.error(
            "Error fetching name:",
            error.response ? error.response.data : error.message
          );
        }
      };
  
      fetchName();
    }, []);

    return <div className="shadow-md shadow-gray-300 h-14 flex justify-between mb-5 border-solid border-black">
        <div className="flex flex-col justify-center h-full ml-2 text-2xl font-semibold ">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-2xl font-semibold">
                H Hello, {name ? name[0].toUpperCase() + name.slice(1) : "Loading..."}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 text-4xl font-semibold">
                <div className="flex flex-col justify-center h-full text-xl">
                {name ? name[0]?.toUpperCase() : ""}
                </div>
            </div>
        </div>
    </div>
}