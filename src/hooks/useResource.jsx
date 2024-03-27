import axios from 'axios';
import React, { useEffect, useState } from 'react'
function useResource(id) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const controller = new AbortController();
    const getData = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products/category/${id}`, {
            single: controller.single,
        }
        );
        setProduct(data.products);
        setLoading(false);
    }
    useEffect(() => {
        getData();
        return () => {
            controller.abort();
        };
    }, []);
    return (
        { product, loading, setLoading }
    )
}

export default useResource
