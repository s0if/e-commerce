import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loder from '../../../components/Loder';
import { TokenContext } from '../../context/components/Token';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';

function Order() {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext)
  const [errors, setErrors] = useState([]);
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
  // const handelsubmitremove = async (id) => {
  //   const { data } = await axios.patch(
  //     `${import.meta.env.VITE_API}/cancel/${id}`,{
  //       headers: {
  //         Authorization: `Tariq__${token}`,
  //       }
  //     }
  //   )
  // }

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
  }, [])
  if (loading) {
    return <Loder />
  }
  console.log(order);
  return (
    <div className="bg-register-login">
      <h1 className='d-flex text-danger justify-content-center py-3'>order</h1>
      <div>
          {/* {
            orderProduct.map(order=>{
              {
                (order.status==)&&
              }
            })
          } */}
        </div>
      <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmitorder}>
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>coupon</label>
          <input
            className="form-control"
            type="text"
            value={order.coupon}
            name="coupon"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>adres</label>
          <input
            className="form-control"
            type="text"
            value={order.address}
            name="address"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
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
            className="btn btn-secondary btn-hover-transform"
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
