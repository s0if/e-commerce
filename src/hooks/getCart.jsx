import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../context/Token';
function getCart() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [proudctInCarase, setProudctInCarase] = useState([]);
    const [numperOfProduct, setNumperOfProduct] = useState(1);
    const [numberItem, setNumberItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);
    const { token } = useContext(TokenContext)
    const getCart = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/cart`,
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }
        )
        setCart(data.products);
        setNumperOfProduct(data.products.quantity);
        setNumberItem(data.products.length)
        setLoading(false);
    }
    useEffect(() => {
        getCart()
    }, [proudctInCarase, numperOfProduct, loading])

    useEffect(() => {
        var totalPriceCalc = 0;
        cart.forEach(item => {
            totalPriceCalc += item.details.finalPrice * item.quantity;
        });
        setTotalPrice(totalPriceCalc.toFixed(2));
    }, [cart]);
    return (
        { numberItem, setNumberItem, cart, proudctInCarase, numperOfProduct, setNumperOfProduct, totalPrice, setProudctInCarase, setTotalPrice, loading, setLoading }
    )
}

export default getCart
