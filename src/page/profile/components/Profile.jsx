import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../context/components/Token'
import Loder from '../../../components/Loder'
import { Link } from 'react-router-dom'

function Profile() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [turn1, setTurn1] = useState(true)
    const [turn2, setTurn2] = useState(false)
    const [turn3, setTurn3] = useState(false)
    const { token } = useContext(TokenContext)
    const getProfiles = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/user/profile`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            setUser(data.user)
        }
        catch (error) {
            console.log(error)
        }

    }
    const handelcancle = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API}/order/cancel/${id}`, {
            },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const [order, setOrder] = useState([])
    const getOrder = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/order`, {
            headers: {
                Authorization: `Tariq__${token}`
            }
        }
        )
        setOrder(data.orders)
    }
    useEffect(() => {
        getProfiles()
        getOrder()
    }, [loading])
    console.log(order)
    return (
        <>
            <div className='d-flex flex-sm flex-lg'>
                <div className='bg-danger w-25  rounded'>
                    {
                        <div className='d-flex py-5 px-4  flex-column w-100 gap-5'>
                            <Link className=' text-decoration-none border-bottom border-dark' onClick={() => {
                                setTurn1(true)
                                setTurn2(false)
                                setTurn3(false)
                            }}>
                                <h4 className='w-100 text-dark ' >
                                    <i className="bi icon bi-info-circle-fill pe-2"></i>
                                    Account Information
                                </h4>
                            </Link>

                            <Link className=' text-decoration-none border-bottom border-dark' onClick={() => {
                                setTurn1(false)
                                setTurn2(true)
                                setTurn3(false)
                            }}>
                                <h4 className='w-100 text-dark' >
                                    <i className="bi icon bi-person-lines-fill pe-2"></i>
                                    connect
                                </h4>
                            </Link>
                            <Link className=' text-decoration-none border-bottom border-dark' onClick={() => {
                                setTurn1(false)
                                setTurn2(false)
                                setTurn3(true)
                            }}>
                                <h4 className='w-100 text-dark' >
                                    <i className="bi icon bi-shop pe-2"></i>
                                    order</h4>
                            </Link>
                        </div>
                    }

                </div>
                {
                    turn1 && <div className=' w-100 d-flex align-items-center  gap-3 rounded bg-success  justify-content-center  py-5'>
                        {user.image ? <img src={`${user.image.secure_url}`} className='rounded size-image-profile' alt="" /> : <Loder />}
                        <div>
                            {user.userName ? <h1 className='text-warning-emphasis'>name: {user.userName}</h1> : <Loder />}
                            {user.email ? <h2 className='text-warning-emphasis'>email: {user.email}</h2> : <Loder />}
                        </div>
                    </div>
                }
                {
                    turn2 && <div className='d-flex align-items-center px-5 gap-3 rounded bg-success  justify-content-end w-100 py-5 flex-column'>

                        {
                            user.userName ? <h1 className='text-warning-emphasis '>
                                name:
                                <Link to='https://wa.me/qr/X5J7RTHY7QFUI1'>
                                    {user.userName}
                                </Link>
                            </h1> : <Loder />
                        }
                        {
                            user.email ? <h2 className='text-warning-emphasis'>
                                email:
                                <Link to={
                                    `https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfpsSShxckVnKHRxrKjDFmvsPrlQDvCBLgDXNmsGPZKGQrPxMJHGplGtPWWHGnmvnzcNVq`
                                }>
                                    {user.email}
                                </Link>
                            </h2> : <Loder />
                        }


                    </div>
                }

                {
                    turn3 && <div className='d-flex align-items-center px-5 gap-3 rounded bg-success  justify-content-end w-100 py-5 flex-column'>

                        <table class="table table-responsive table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">photo</th>
                                    <th scope="col">status</th>
                                    <th scope="col">final price</th>
                                    <th scope="col">updatedAt</th>
                                    <th scope="col">payment Type</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.map(order => {
                                        return (
                                            <tr>
                                                <th scope="row"><img src={`${user.image.secure_url}`} className='rounded size-profile' alt="" /></th>
                                                <td>{order.status}</td>
                                                <td>${order.finalPrice}</td>
                                                <td>{order.updatedAt}</td>
                                                <td><i className="bi icon bi-cash-coin">{order.paymentType}</i></td>
                                                <td>
                                                    {order.status == 'pending' ? <button
                                                        type="submit"
                                                        className="btn btn-success btn-hover start-0 top-0 "
                                                        onClick={() => handelcancle(order._id)}
                                                    >
                                                        {order.status}
                                                    </button> : <button
                                                        type="submit"
                                                        className="btn btn-danger btn-hover start-0 top-0 disabled"

                                                    >
                                                        {order.status}
                                                    </button>

                                                    }

                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>


                    </div>
                }
            </div>

        </>
    )
}

export default Profile