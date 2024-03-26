import { createContext, useEffect, useState } from "react";
export const cartsContext = createContext();
const CartsContextProvider = ({ children }) => {
    const product = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`)
        return data;
    }
    const [productId, setProductId] = useState('')
    useEffect(() => {
        if (productId) {
            const decoded = jwtDecode(productId);
            // setProductId(decoded)
            console.log(decoded)
            product
        }

    }, [productId])
    return (
        <cartsContext.Provider value={productId}>
            {children}
        </cartsContext.Provider>)
    // return <CartContext.Provider></CartContext.Provider>
    // return <CartsContext.Provider value={productId}>
    //     {children}
    // </CartsContext.Provider>

}
export default CartsContextProvider