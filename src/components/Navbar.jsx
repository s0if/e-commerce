import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { NavLink, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../page/context/components/Token';
import axios from 'axios';
function Navbar() {
  const { token, setToken, auth, setAuth } = useContext(TokenContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const handelChange = () => {
    localStorage.removeItem('token')
    navigate('/login')
    setToken('');
    setAuth('');
    toast.success("good bay", {
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
  useEffect(() => {
    getCart()
  }, [cart])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-nav pb-5  ">
        <div className="container-fluid d-flex justify-content-end align-content-center">
          <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav  me-auto d-flex justify-content-center align-items-center  ">
              <li className="nav-item ">
                <h1 className="nav-link fs-5 text-danger"  > {auth ? auth.userName : 'Welcome'}</h1>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link text-white" aria-current="page" to="/" >home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/products">Products</NavLink>
              </li>
            </ul>
            <ul className=' d-flex  navbar-nav  '>
              <li className="nav-item">
                <NavLink className={`nav-link text-white  ${token && 'd-none'}`} to="/register">Register</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={`nav-link text-white ${token && 'd-none'}`} to="/login">Login</NavLink>
              </li>
              <li className="nav-item position-relative ">
                <NavLink className={`nav-link text-white ${!token && "d-none"}`} to="/cart">
                  <div className='mt-1'>
                    <i className="bi bi-cart mt-2">
                    </i></div>
                    {
                      cart.length?<div className='position-absolute top-0 end-0 rounded-circle bg-success p-helf d-flex justify-content-center align-item-center align-items-center'>
                    {cart.length}
                  </div>:<div className='position-absolute top-0 end-0 rounded-circle bg-danger p-helf d-flex justify-content-center align-item-center align-items-center'>
                    {cart.length}
                  </div>
                    }
                  
                </NavLink>
              </li>
              <li className="nav-item ">
                <button className={`nav-link text-white ${!token && "d-none"}`} onClick={handelChange} >logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
