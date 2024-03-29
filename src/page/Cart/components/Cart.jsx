import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
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
  console.log(cart)
  return (
    <div className={`bg-Categores`}>
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center ${auth.id}`}>
        {cart.map(cart => {
          return (
            <div className={`card w-75 h-50 mt-2 mb-4 mx-5 p-5 bg-prodect-information-cart opacity-20 product-shadow`} >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={cart.details.mainImage.secure_url} className={`rounded card-img-top position-relative ratio ratio-21x9`} alt="product mainImage" />
                </div>
                <div className="col-md-8">
                  <div className="card-body border border-2 ms-5">
                    <h5 className="card-title text-white">{cart.details.name}</h5>
                    {(cart.details.finalPrice < cart.details.price) ? <div className='d-flex gap-5 px-3'>
                      <h1 className='bg-prodect-information-cart text-white p-3 fs-2 text-decoration-line-through '>{cart.details.price}$</h1>
                      <h1 className='bg-prodect-information-cart text-white p-3 fs-2 '>{cart.details.finalPrice}$</h1>
                    </div> :
                      <h1 className='bg-prodect-information-cart text-white p-3 fs-2 '>{cart.details.price}$</h1>
                    }
                    <div className='d-flex aspect-ratio-1x1 justify-content-around  p-2'>
                      {cart.details.subImages.map(image =>
                        <img src={image.secure_url} alt="image " className='rounded' />
                      )}
                    </div>

                  </div>
                </div>
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
