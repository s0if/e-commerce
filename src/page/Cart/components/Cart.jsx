import React, { useContext } from 'react'
import axios from 'axios';
import Loder from '../../../components/Loder';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import getCart from '../../../hooks/getCart';
import { TokenContext } from '../../../context/Token';
function Cart() {
  const { token, auth } = useContext(TokenContext)
  const { numberItem, cart, numperOfProduct, setNumperOfProduct, totalPrice, setProudctInCarase, loading, setLoading } = getCart()
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
  if (loading) {
    return <Loder />
  }
  console.log(cart)
  return (
    <div className={`bg-FFD498`}>
      <div className={` d-flex flex-column flex-wrap container gap-lg-2 gap-sm-1 justify-content-center   ${auth.id}`}>
        <div className='mx-4 mt-4 text-denger  d-flex justify-content-center'>
          <h1 >Shopping Cart</h1>
        </div>
        {cart.length ?
          <div className='d-flex flex-sm flex-lg container'>
            <table className="w-sm-100 table col-md-4 col-sm-3 w-fitContent shadow mb-4 table-striped-columns w-sm-5">
              <tbody className='container'>
                {cart.map(cart => {
                  return (
                    <>
                      <tr className='position-relative w-100 h-auto  d-flex flex-sm flex-lg  justify-content-center'>

                        <td scope="col" className='w-10 w-sm-100'>
                          <img src={cart.details.mainImage.secure_url} className={`rounded card-img-top w-100`} alt="product mainImage" />
                        </td>
                        <td className='w-10 w-sm-100 d-flex justify-content-center align-items-center'>
                          <h6 className=" text-darh">{cart.details.name}</h6>
                        </td>
                        <td className='w-10 w-sm-100 d-flex justify-content-center align-items-center' >
                          <td>
                            <button
                              type="submit"
                              className="btn btn-primary my-1 btn-hover-red "
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
                              className="btn btn-primary  my-1 btn-hover-success"
                              onClick={() => handelincrease(cart.productId)}
                            >
                              +
                            </button>
                          </td>
                        </td>
                        <td scope="col" className='w-sm-100 px-2 w-10  d-flex justify-content-center align-items-center'>
                          <h2 className=' text-dark m-sm-helf fs-sm-1'>${(cart.details.finalPrice).toFixed(2)}</h2>
                        </td>
                        <td scope="col" className='w-sm-100 px-2 w-10  d-flex justify-content-center align-items-center'>
                          <h2 className=' text-dark p-sm-1  m-sm-helf fs-sm-1 '>${
                            (cart.details.finalPrice * cart.quantity).toFixed(2)
                          }</h2>
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-primary btn-hover-red  position-absolute start-0 top-0"
                            onClick={() => handelremove(cart.productId)}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </td>
                      </tr>

                    </>
                  )
                })}
              </tbody>
            </table>
            <div className='bg-white w-100 me-4 mb-4 shadow px-5 rounded container'>
              <h1 className='border-bottom border-dark p-lg-3 p-sm-0'>Summary</h1>
              <h1 className='border-bottom border-dark p-lg-3 p-sm-0'>item:{numberItem}</h1>
              <h2 className='border-bottom border-dark p-lg-3 p-sm-0  d-flex flex-lg'>TOTAL PRICE: ${totalPrice}</h2>
              <div className='px-2 py-3 d-flex flex-column justify-content-center '>
                <NavLink to='/order'>
                  <button
                    type="submit"
                    className="btn w-100 btn-primary my-1 btn-hover-success "
                  >
                    Confirmation
                  </button>
                </NavLink>
                <button
                  type="submit"
                  className="btn btn-primary  my-1 btn-hover-success "
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
