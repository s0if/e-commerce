import React, { useState } from 'react'
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loder from '../../../components/Loder';
import { object, string } from "yup";

function Forget() {
    const [loder, setLoder] = useState(false)
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [code, setCode] = useState({
        email: '',
        password: '',
        codes: ''

    })
    const handelChange = (e) => {
        const { name, value } = e.target;
        setCode({
            ...code,
            [name]: value,
        })
    }
    const validateData = async (code) => {
        const codeSchema = object({
            email: string().email().required(),
            password: string().min(4).max(20).required(),
            codes: string().min(4).max(20).required(),
        });
        try {
            await codeSchema.validate(code, { abortEarly: false });
            return true;
        } catch (error) {
            setErrors(error.errors);
            return false;
        }
    };
    const handelSubmit = async (e) => {
        e.preventDefault()
        const validate = await validateData(code)
        if (validate) {
            setLoder(true)
            try {
                const { data } = await axios.patch(
                    `${import.meta.env.VITE_API}/auth/forgotPassword`, {
                    email: code.email,
                    password: code.password,
                    code: code.codes
                }
                )
                if (data.message == "success") {
                    toast.success('the code has been sent', {
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
            } finally {
                setLoder(false)
            }
        }
    }
    return (


        <div className="bg-register-login">
            <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmit}>

                <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={code.email}
                        name="email"
                        onChange={handelChange}
                    />
                </div>
                <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={code.password}
                        name="password"
                        onChange={handelChange}
                    />
                </div>
                <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
                    <label>code</label>
                    <input
                        className="form-control"
                        type="text"
                        value={code.codes}
                        name="codes"
                        onChange={handelChange}
                    />
                </div>
                <div className="d-flex p-2 gap-3 justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-secondary btn-hover-transform"
                        disabled={loder ? "disabled" : null}
                    >
                        {loder ? <Loder /> : ""}
                        register
                    </button>
                </div>
                <div className="w-auto d-flex p-2 justify-content-center align-items-center  flex-column">
                    {errors.length ? errors.map((error, index) => <p className="p-2  border bg-danger border-danger" key={index}>{error}</p>) : ''}
                </div>
            </form>
        </div>
    )
}

export default Forget
