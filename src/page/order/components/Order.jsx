import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loder from '../../../components/Loder';
import { TokenContext } from '../../../context/Token';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import getCart from '../../../hooks/getCart';
import { NavLink } from 'react-router-dom';

function Order() {
  // const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext)
  const [errors, setErrors] = useState([]);
  const { cart, loading, setLoading } = getCart()
  const [order, setOrder] = useState({
    coupon: "",
    address: "",
    phone: "",
  });
  const [orderProduct, setOrderProduct] = useState([])
  const handelorderproduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        }
      }
      )
      setOrderProduct(data.orders)
    } catch (error) {
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
      setLoading(false);
    }
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

  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const validateData = async (order) => {
    const registerSchema = object({
      code: string().min(5).max(20),
      address: string().required(),
      phone: string().min(8).max(10).required(),
    });
    try {
      await registerSchema.validate(order, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }
  };

  const handelSubmitorder = async (e) => {
    e.preventDefault();
    const validate = await validateData(order)
    if (validate) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/order`, {
          couponName: order.coupon,
          address: order.address,
          phone: order.phone,
        },
          {
            headers: {
              Authorization: `Tariq__${token}`
            }
          }
        )
        order.coupon='';
        order.address='';
        order.phone='';
        setOrder(data)
        if (data.message == "success") {
          toast.success("confirmation has been sent please check your email", {
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
      } catch (error) {

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
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    handelorderproduct()
  }, [loading])
  if (loading) {
    return <Loder />
  }
  console.log(cart);
  return (
    <div className="bg-FFD498">
      <h1 className='d-flex justify-content-center py-3'>order</h1>
      <div className='d-flex justify-content-center flex-lg flex-sm  gap-1'>
        {
          cart.map(cart => {
            return (
              <div className=' position-relative align-self-center'>
                <NavLink to={`/information/${cart.productId}`}>
                  <img src={cart.details.mainImage.secure_url} alt="image" className='rounded size image-hover-shrinks' />
                </NavLink>
                <button
                  type="submit"
                  className="btn btn-danger btn-hover  position-absolute start-0 top-0"
                  onClick={() => handelremove(cart.productId)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            )
          })

        }
      </div>
      <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmitorder}>
        <div className="d-flex p-2 gap-3 justify-content-center flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>coupon <span className='text-danger'>(Optional)</span></label>
          <input
            className="form-control"
            type="text"
            value={order.coupon}
            name="coupon"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center  flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>addresd</label>
          <input
            className="form-control"
            type="text"
            value={order.address}
            name="address"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>phone</label>
          <input
            className="form-control"
            type="text"
            value={order.phone}
            name="phone"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center">
          <button
            type="submit"
            className="btn btn-success btn-hover-transform"
            disabled={loading && "disabled"}
          >
            {loading && <Loder />}
            order
          </button>
        </div>
      </form>
      <div className="w-auto d-flex p-2 justify-content-center align-items-center  flex-column">
        {errors.length > 0 && errors.map((error, index) => <p className="p-2  border bg-danger border-danger" key={index}>{error}</p>)}
      </div>
    </div>
  )
}

export default Order
