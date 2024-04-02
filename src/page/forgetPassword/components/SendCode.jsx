import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Loder from '../../../components/Loder';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function SendCode() {
    const [email, setEmail] = useState('');
    const [loder, setLodder] = useState(false);
    const Navigate = useNavigate();
    const handelChange = (e) => {
        setEmail(e.target.value);
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        setLodder(true);
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API}/auth/sendcode`, {
                email
            }
            )
            console.log(data)
            if (data.message == "success") {
                toast.success('the code has been sent please check your email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
                Navigate('/forget')
            }
        } catch (error) {
            toast('error try agin', {
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
            setLodder(false);
        }
    }

    return (
        <div className="bg-FFD498 p-5">
            <h1 className='d-flex text-danger justify-content-center py-3'>send code</h1>
            <form className=" d-flex p-2 justify-content-center align-items-center flex-column row m-0" onSubmit={handelSubmit}>
                <div className="d-flex p-2 gap-3 justify-content-center text-white flex-column col-md-3 col-lg-4 col-sm-6 col-xs-12">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={email}
                        name="email"
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
                        sent code
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SendCode
