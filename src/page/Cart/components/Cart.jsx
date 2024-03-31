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
      setNumperOfProduct(numperOfProduct + 0)
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
  useEffect(() => {
    getCart()
  }, [proudctInCarase, numperOfProduct])

  if (loading) {
    return <Loder />
  }
  console.log(cart)
  return (
    <div className={`bg-prodect-information-cart`}>
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 justify-content-center ${auth.id}`}>
        {cart.length ? <table className="table col-md-4 col-sm-3 table-bordered  w-fitContent shadow m-4">
          <thead>
            <tr >
              <th scope="col">photo</th>
              <th scope="col ">product</th>
              <th scope="col">price</th>
              <th scope="col">total price</th>
            </tr>
          </thead>
          {cart.map(cart => {
            return (
              <>
                <tbody>
                  <tr className=' w-auto h-auto'>

                    <td scope="col" className='w-10'>
                      <img src={cart.details.mainImage.secure_url} className={`rounded card-img-top w-100`} alt="product mainImage" />
                    </td>
                    <td scope="col" >
                      <tr className='d-flex flex-column p-2'>
                        <th scope="col ">
                          <h5 className="card-title text-darh fs-6">name:{cart.details.name}</h5>
                        </th>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-danger my-1 btn-hover"
                            onClick={() => (handeldecrease(cart.productId))}
                          >
                            -
                          </button>
                          {cart.quantity}
                          <button
                            type="submit"
                            className="btn btn-success my-1 btn-hover"
                            onClick={() => handelincrease(cart.productId)}
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-danger my-1 btn-hover"
                            onClick={() => handelremove(cart.productId)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>{cart.details.name}</td>
                      </tr>
                    </td>
                    <td scope="col">
                      <h2 className=' text-dark p-sm-1  m-sm-helf fs-sm-1 '>${cart.details.finalPrice}</h2>
                    </td>
                    <td scope="col">
                      <h2 className=' text-dark p-sm-1  m-sm-helf fs-sm-1 '>${
                        cart.details.finalPrice * cart.quantity
                      }</h2>
                    </td>
                  </tr>
                </tbody>
              </>
            )
          })}

        </table> : <div className='d-flex flex-column justify-content-center '>
          <span className="card-title fs-2 my-2 text-danger">empty cart</span>
          <NavLink className="text-success " to='/products'>do you wont to go shopping?</NavLink>
        </div>
        }
      </div >
    </div >
  )
}

export default Cart
