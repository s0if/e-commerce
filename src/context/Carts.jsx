import axios from "axios";
import { useContext, useEffect, useState } from "react";
export const CartsContext = useContext(null);
const CartsContextProvider = ({ cildren }) => {
    const [cart, setCart] = useState(0);
    const getCart = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/cart`,
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }
        )
        setCart(data.count);
        console.log(data.count)
    }
    useEffect(
        () => {
            getCart();
        },
        []
    )
    return (
        <CartsContext.Provider value={cart}>
            {cildren}
        </CartsContext.Provider>
    )
}

export default CartsContextProvider;
