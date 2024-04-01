import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
function Cart() {
  const { token, auth } = useContext(TokenContext)
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [proudctInCarase, setProudctInCarase] = useState([]);
  const [numperOfProduct, setNumperOfProduct] = useState(1);
  const [numberItem, setNumberItem] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0);
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
  const handelremove = async (productId) => {
    try {
      setLoading(true)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId
        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      if (data.message === "success") {
        toast.success('Deleted successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      setProudctInCarase(data)
    }
    catch (error) {
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    finally {
      setLoading(false)
    }
  }
  const handelincrease = async (productId) => {
    try {
      setNumperOfProduct(numperOfProduct + 0)
      setLoading(true)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        {
          productId
        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      if (data.message === "success") {
        toast.success('increase successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
    catch (error) {
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    finally {
      setLoading(false)
    }
  }

  const handeldecrease = async (productId) => {
    try {
      setLoading(true)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
        {
          productId
        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      setNumperOfProduct(numperOfProduct + 0)
      if (data.message === "success") {
        toast.success('decrase successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
    catch (error) {
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    finally {
      setLoading(false)
    }
  }

  const handelClearCart = async () => {
    try {
      setLoading(true)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/clear`,
        {

        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      if (data.message === "success") {
        toast.success('clear cart successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
    catch (error) {
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    finally {
      setLoading(false)
    }
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

  if (loading) {
    return <Loder />
  }
  console.log(totalPrice)
  return (
    <div className={`bg-prodect-information-cart`}>
      <div className={` d-flex flex-column flex-wrap container gap-lg-2 gap-sm-1 justify-content-center   ${auth.id}`}>
        <div className='mx-4 mt-4 text-denger  d-flex justify-content-center'>
          <h1 className='text-danger'>Shopping Cart</h1>
        </div>
        {cart.length ?
          <div className='d-flex flex-sm flex-lg container'>
            <table className=" table col-md-4 col-sm-3 w-fitContent shadow ms-4 mb-4 table-striped-columns ">
              {cart.map(cart => {
                return (
                  <>
                    <tbody className='position-relative d-flex flex-sm flex-lg container'>
                      <tr className=' w-auto h-auto d-flex flex-sm flex-lg container'>

                        <td scope="col" className='w-10'>
                          <img src={cart.details.mainImage.secure_url} className={`rounded card-img-top w-100`} alt="product mainImage" />
                        </td>
                        <td className='w-10 py-5'>
                          <h6 className=" text-darh">{cart.details.name}</h6>
                        </td>
                        <td className='py-5' >
                          <td>
                            <button
                              type="submit"
                              className="btn btn-danger my-1 btn-hover "
                              onClick={() => (handeldecrease(cart.productId))
                              }
                              disabled={cart.quantity == 1 ? "disabled" : null}
                            >
                              -
                            </button>
                          </td>
                          <td><h2 className='my-1'>{cart.quantity}</h2></td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-success my-1 btn-hover"
                              onClick={() => handelincrease(cart.productId)}
                            >
                              +
                            </button>
                          </td>
                        </td>
                        <td scope="col" className='py-5 px-2 '>
                          <h2 className=' text-dark p-sm-1  m-sm-helf fs-sm-1'>${cart.details.finalPrice}</h2>
                        </td>
                        <td scope="col" className='py-5 px-2'>
                          <h2 className=' text-dark p-sm-1  m-sm-helf fs-sm-1 '>${
                            (cart.details.finalPrice * cart.quantity).toFixed(2)
                          }</h2>
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-danger btn-hover  position-absolute start-0 top-0"
                            onClick={() => handelremove(cart.productId)}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                )
              })}

            </table>
            <div className='bg-white w-100 me-4 mb-4 shadow px-5 rounded'>
              <h1 className='border-bottom border-dark p-lg-3 p-sm-0'>Summary</h1>
              <h1 className='border-bottom border-dark p-lg-3 p-sm-0'>item:{numberItem}</h1>
              <h2 className='border-bottom border-dark p-lg-3 p-sm-0  d-flex flex-lg'>TOTAL PRICE: ${totalPrice}</h2>
              <div className='px-2 py-3'>
                <button
                  type="submit"
                  className="btn btn-danger my-1 btn-hover "
                  onClick={() => (handelClearCart())}
                >
                  clear cart
                </button>
              </div>
            </div>
          </div>
          :
          <div className='d-flex flex-column w-100  m-4 '>
            <span className="card-title fs-2 my-2 text-danger d-flex justify-content-center">empty cart</span>
            <NavLink className="text-success d-flex justify-content-center" to='/products'>do you wont to go shopping?</NavLink>
          </div>
        }
      </div >
    </div >
  )
}

export default Cart
