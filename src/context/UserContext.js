import { useState,createContext, useEffect } from "react";
import { URL } from "../url";
import axios from "axios";

const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [user,setuser] = useState(null)
    const [load,setload] = useState(false)

    useEffect (()=>{
        getUser()
    },[])


    const getUser = () =>{
        axios.get(URL + "/api/auth/refetch", { withCredentials: true })
        .then(res => {
            setuser(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setload(true);
        });
    }

    return (
        <UserContext.Provider value={{user,setuser}} >
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;