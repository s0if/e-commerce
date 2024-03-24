import axios from "axios";
import React, { useState } from "react";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import Loder from "../../../components/Loder";
import "./Background.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Login() {
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
      console.log("is a erroe", error);
      setErrors(error.errors);
      console.log(error.errors);
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
        localStorage.setItem("token", data.token);
        if (data.message == "success") {
          toast("success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate('/');
        }
      } catch (error) {
        if (error.response.status == 400) {
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

      }
      finally {
        setLoder(false);

      }
    }
  };
  return (
    <div className="b-r-l p-5">
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
            className="btn btn-secondary"
            disabled={loder ? "disabled" : null}
          >
            {loder ? <Loder /> : ""}
            submit
          </button>
        </div>
      </form>
      <div className="w-auto d-flex p-2 justify-content-center align-items-center  flex-column">
        {errors.length > 0 ? errors.map((error, index) => <p className="p-2  border bg-danger border-danger" key={index}>{error}</p>) : ''}
      </div>
    </div>
  );
}
export default Login;
