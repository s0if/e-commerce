import axios from "axios";
import React, { useContext, useState } from "react";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import Loder from "../../../components/Loder";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/components/Token";
function Login() {
  const { setToken, setauth } = useContext(TokenContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [loder, setLoder] = useState(false);
  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async (user) => {
    const loginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await loginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateData(user);
    if (validate) {
      setLoder(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          {
            email: user.email,
            password: user.password,
          }
        );
        setUser({
          email: "",
          password: "",
        });
        if (data.message == "success") {
          toast('login success', {
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
          navigate('/');
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
      } catch (error) {
        toast(error.response.data.message, {
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
        setLoder(false);

      }
    }
  };
  return (
    <div className="bg-FFD498 p-5">
      <h1 className='d-flex text-danger justify-content-center py-3'>login</h1>
      <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmit}>

        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={user.email}
            name="email"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={user.password}
            name="password"
            onChange={handelChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center text-white ">
          <button
            type="submit"
            className="btn btn-secondary btn-hover-transform"
            disabled={loder ? "disabled" : null}
          >
            {loder ? <Loder /> : ""}
            login
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center gap-3 pt-4">
        <NavLink className="text-success " to='/register'>Creat Account</NavLink>
        <NavLink className="text-success " to='/sendcode'>forget password?</NavLink>
      </div>
      <div className="w-auto d-flex p-2 justify-content-center align-items-center  flex-column">
        {errors.length ? errors.map((error, index) => <p className="p-2  border bg-danger border-danger" key={index}>{error}</p>) : ''}
      </div>
    </div>
  );
}
export default Login;
