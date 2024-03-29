import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 justify-content-center ${auth.id}`}>
        {cart.map(cart => {
          return (
            <div className={`card w-75 h-50 mt-2 mb-4 p-lg-5 p-2 d-flex flex-sm-column bg-prodect-information-cart opacity-20 product-shadow container`} >
              <div className="row g-0 row-gap-3">
                <div className="col-md-4 col-sm-3">
                  <img src={cart.details.mainImage.secure_url} className={`rounded card-img-top ratio ratio-21x9 `} alt="product mainImage" />
                </div>
                <div className="col-md-8">
                  <div className="card-body border border-2 w-auto mx-sm-0 mx-lg-3">
                    <h5 className="card-title text-white fs-6">{cart.details.name}</h5>
                    {(cart.details.finalPrice < cart.details.price) ? <div className='d-flex justify-content-sm-center justify-content-lg-around px-lg-3 px-sm-0'>
                      <h2 className='bg-prodect-information-cart text-white p-sm-1 p-lg-3 m-lg-3 m-sm-helf fs-sm-1  text-decoration-line-through '>{cart.details.price}$</h2>
                      <h2 className='bg-prodect-information-cart text-white p-sm-1 p-lg-3 m-lg-3 m-sm-helf fs-sm-1'>{cart.details.finalPrice}$</h2>
                    </div> :
                      <h2 className='bg-prodect-information-cart text-white p-sm-1 p-lg-3 m-lg-3 m-sm-helf fs-sm-1 '>{cart.details.price}$</h2>
                    }
                    <div className='d-flex aspect-ratio-21x9 justify-content-around  p-2'>
                      {
                        <Swiper
                          autoHeight={true}
                          spaceBetween={20}
                          navigation={true}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Navigation, Pagination]}
                          className="mySwiper image-hover"
                        >
                          {

                            cart.details.subImages.map(image =>
                              <SwiperSlide className='product-shadow rounded ratio ratio-21x9 ' >
                                <div
                                  className="categories "
                                >
                                  <img src={image.secure_url} alt="image " className='rounded ' />
                                </div>
                              </SwiperSlide>
                            )
                          }
                        </Swiper>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div >

  )
}

export default Cart
