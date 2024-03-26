import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useResource(id) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products/category/${id}`
        );
        setProduct(data.products);
        setLoading(false);
    }
    useEffect(() => {
        getData(id)
    }, []);
    return (
        { product, loading, setLoading }
    )
}

export default useResource
