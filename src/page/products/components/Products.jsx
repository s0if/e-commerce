import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Products() {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getProducts = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products`
        );
        setProducts(data.products);
        setLoading(false);
    }
    useEffect(() => {
        getProducts()
    }, [])
    
    console.log(product.categoryId)
    return (
        <h1>Product</h1>
    //     <div className="bg-Categores">
    //   <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center `}  >
    //     {product.length ?
    //       product.map(product =>
    //         <div className={`card width-cart mt-2 mb-4 bg-prodectCategores-cart opacity-20 prodectCategores-shadow ${product._id}`} >

    //           <img src={product.products.mainImage.secure_url} className={`card-img-top `} alt="product mainImage" />
    //           <div className="card-body">
    //             <h5 className="card-title text-white">{product.products.name}</h5>
    //           </div>
              
    //         </div>
    //       ) : <spam className="card-title fs-2 my-2 text-danger">empty product</spam>
    //     }
    //   </div>
    // </div>
    )
}

export default Products
