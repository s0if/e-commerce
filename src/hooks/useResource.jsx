// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// function useResource() {
//      const [loading, setLoading] = useState(true);
//     const [product, setProduct] = useState([]);
//     const getData = async (id) => {
//         const { data } = await axios.get(
//             `${import.meta.env.VITE_API}/products/category/${id}`
//         );
//         setProduct(data.products);
//         setLoading(false);
//     }
//     useEffect((
//         () => {
//             getData()
//         }
//     ), []);
//     return (
//         { product}
//     )
// }

// export default useResource
