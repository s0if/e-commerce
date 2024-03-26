import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../context/components/Token';
import axios from 'axios';
// import { cartsContext } from '../../context/components/Carts';
function Cart() {

  const { auth, token } = useContext(TokenContext);
  const [cart, setCart] = useState([]);
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
  }
  const getProduct = async (productId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/products/${productId}`
    );
    // console.log(data);
  }
  useEffect(() => {
    getCart()
  }, [])
  useEffect(() => {
    getProduct(cart.productId)
  }, [cart])
  // console.log(cart)
  return (
    <h1>saif</h1>
    // <div>
    //   {
    //     cart.map(cart => {

    //       //   <div className={`card width-cart mt-2 mb-4 bg-prodectCategores-cart opacity-20 prodectCategores-shadow ${product._id}`} >
    //       //   <img src={product.mainImage.secure_url} className={`card-img-top `} alt="product mainImage" />
    //       //   <div className="card-body">
    //       //     <h5 className="card-title text-white">{product.name}</h5>
    //       //   </div>
    //       //   <button
    //       //     type="submit"
    //       //     className="btn btn-secondary btn-hover"
    //       //     onClick={() => handelcahnge(product.id)}
    //       //   >
    //       //     add product
    //       //   </button>
    //       // </div>



    //       return (
    //         <div className={`card width-cart mt-2 mb-4 bg-prodectCategores-cart opacity-20 prodectCategores-shadow ${cart._id}`} >
    //           {/* <img src={const { data} = await axios.get(
    //           `${import.meta.env.VITE_API}/products/`
    //            )} className={`card-img-top `} alt="product mainImage" /> */}

    //         </div>
    //       );
    //     })
    //   }
    // </div>
  )
}

export default Cart
