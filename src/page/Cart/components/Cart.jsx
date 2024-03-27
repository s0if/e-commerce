import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
function Cart() {
  const { token, auth } = useContext(TokenContext)
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }
  useEffect(() => {
    getCart()
  }, [])

  if (loading) {
    return <Loder />
  }
  return (
    <div className={`bg-Categores`}>
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center ${auth.id}`}>
        {cart.map(cart => {
          return (
            <div className={`card width-cart mt-2 mb-4 bg-prodect-cart opacity-20 product-shadow`} >
              <img src={cart.details.mainImage.secure_url} className={`card-img-top position-relative`} alt="product mainImage" />
              <div className="card-body">
                <h5 className="card-title text-white">{cart.details.name}</h5>
                <h5 className="card-title text-white position-absolute start-0 top-0  bg-prodect-cart p-2 m-2 border border-1 rounded">{cart.details.price}$</h5>
              </div>
            </div>
          );
        })
        }
      </div>
    </div>
  )
}

export default Cart
