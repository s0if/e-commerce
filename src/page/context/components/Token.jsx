import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
export const TokenContext = createContext();
const TokenContextProvider = ({ children }) => {
    const [token,setToken]=useState(localStorage.getItem("token")||"")
    const [auth,setAuth]=useState("");
    const decoded = jwtDecode(token);
    // console.log(decoded)
    
    return (
        <TokenContext.Provider value={{token,setToken,auth}}>
            {children}
        </TokenContext.Provider>
    );
}
export default TokenContextProvider;