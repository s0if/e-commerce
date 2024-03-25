import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export const TokenContext = createContext();
const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [auth, setAuth] = useState(localStorage.getItem("token") || "");
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setAuth(decoded);
        }
    }, [token])


    return (
        <TokenContext.Provider value={{ token, setToken, auth, setAuth }}>
            {children}
        </TokenContext.Provider>
    );
}
export default TokenContextProvider;