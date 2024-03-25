import axios from "axios";
import React, {  useState } from "react";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import Loder from "../../../components/Loder";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
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
  const handelImageChange = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async (user) => {
    const registerSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
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
      const formdata = new FormData();
      formdata.append("userName", user.userName);
      formdata.append("email", user.email);
      formdata.append("password", user.password);
      formdata.append("image", user.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formdata
        );
        setUser({
          userName: "",
          email: "",
          password: "",
          image: "",
        });
        if (data.message == "success") {
          toast.success("sucsses", {
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
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status == 409) {

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
      }
      finally {
        setLoder(false);
      }
    }
  };
  return (
    <div className="bg-register-login">
      <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmit}>
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            value={user.userName}
            name="userName"
            onChange={handelChange}
          />
        </div>
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
        <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
          <label>Image</label>
          <input
            className="form-control"
            type="file"
            name="image"
            onChange={handelImageChange}
          />
        </div>
        <div className="d-flex p-2 gap-3 justify-content-center">
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
export default Register;
