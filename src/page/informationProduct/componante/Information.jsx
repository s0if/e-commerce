import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';
import { TokenContext } from '../../../context/Token';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

function Information() {
    const { id } = useParams('id');
    const [loder, setLodder] = useState(true);
    const [product, setProduct] = useState({});
    const { token } = useContext(TokenContext)
    const [commit, setCommit] = useState('')
    const [rating, setRating] = useState('')
    const [reviw, setReviw] = useState([])
    const getProudct = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products/${id}`
        )
        setProduct(data.product)
        setReviw(data.product.reviews)
        setLodder(false)
    }
    const handelCreateReview = async (id) => {
        setLodder(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/products/${id}/review`,
                {
                    comment: commit,
                    rating: rating,

                },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            )
            setCommit('');
            setRating('');
            setLodder(false);
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
            setLodder(false);
        }
    }
    const handeladd = async (productId) => {
        setLodder(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/cart`,
                { productId },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            if (data.message === "success") {
                toast.success('added to cart', {
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
        } finally {
            setLodder(false);
        }
    };

    useEffect(() => {
        getProudct()
    }, [])
    if (loder) {
        return <Loder />
    }
    return (
        <>

            {
                <div className=' shadow'>
                    <div className='w-auto d-flex justify-content-center align-items-center gap-xl-5 gap-lg-2 gap-sm-1 py-5 flex-wrap flex-lg-nowrap  container'>
                        <img src={product.mainImage.secure_url} alt="photo" className='rounded card-img-top w-20 my-4' />
                        <div className='w-auto border border-dark rounded h-auto bg-product-information'>
                            <h1 className='border-bottom border-dark p-3 fs-2 px-3'>{product.name}</h1>
                            <div className='d-flex  align-items-center gap-5  flex-sm flex-lg'>
                                {
                                    (product.finalPrice < product.price) ? <div className='d-flex gap-5 px-3'>
                                        <h1 className='border-bottom border-dark p-3 fs-2 text-decoration-line-through '>{product.price}$</h1>
                                        <h1 className='border-bottom border-dark p-3 fs-2 '>{product.finalPrice}$</h1>
                                    </div> :
                                        <h1 className='border-bottom border-dark p-3 fs-2'>{product.price}$</h1>
                                }
                                <div className='d-flex justify-content-center pb-2'>
                                    <Rating
                                        initialRating={product.ratingNumbers}
                                        readonly
                                        emptySymbol={<FaStar className="text-muted" />}
                                        fullSymbol={<FaStar className="text-warning" />}
                                    />

                                </div>
                            </div >

                            <p className='px-lg-3 p-sm-1 p-lg-3 px-sm-0 py-5 w-auto h-auto'>{product.description}</p>
                            <div className='d-flex justify-content-lg-between justify-content-sm-center flex-sm flex-lg'>
                                <button
                                    type="submit"
                                    className="btn btn-success m-3 btn-hover"
                                    onClick={() => handeladd(product.id)}
                                >
                                    add product
                                </button>
                                <div className='d-flex align-items-center justify-content-center gap-3 flex-lg flex-sm m-3'>
                                    <div className='d-flex align-items-center'>
                                        <label className='fs-3 me-2'>commit</label>
                                        <input
                                            className=" h-fitContent "
                                            type="text"
                                            value={commit}
                                            name="commit"
                                            onChange={(e) => setCommit(e.target.value)}
                                        />
                                    </div>
                                    <Rating
                                        className='fs-5'
                                        onChange={(rate) => setRating(rate)}
                                        initialRating={rating}
                                        emptySymbol={<FaStar className="text-muted" />}
                                        fullSymbol={<FaStar className="text-warning" />}
                                    />
                                    <button className='btn btn-success btn-hover' onClick={() => handelCreateReview(product._id)}>submit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='d-flex d-flex justify-content-center  gap-5 flex-wrap'>

                        {
                            product.subImages.map(image =>
                                <div className=' mb-5 aspect-ratio-21x9 '>
                                    <img src={image.secure_url} className='rounded shadow w-20' alt="image" />
                                </div>
                            )
                        }
                    </div>
                    <h1 className='border-bottom border-danger px-5'>feedpack</h1>
                    <div className='d-flex mx-4 rounded flex-column'>
                        {

                            reviw.map(feedpack => (
                                <div className='d-flex rounded flex-column p-sm-1 px-lg-3 m-sm-helf m-lg-3 px-sm-0 col-lg-12 cpl-sm-4 flex-wrap border border-2 w-auto h-auto '>
                                    <h2>{feedpack.createdBy.userName}:</h2>
                                    <h4 className='font-family px-3 '>{feedpack.comment}</h4>
                                    <Rating
                                        className='fs-5 px-3'
                                        initialRating={feedpack.rating}
                                        readonly
                                        emptySymbol={<FaStar className="text-muted" />}
                                        fullSymbol={<FaStar className="text-warning" />}
                                    />
                                </div>
                            ))


                        }

                    </div>

                </div>
            }

        </>
    )
}

export default Information
