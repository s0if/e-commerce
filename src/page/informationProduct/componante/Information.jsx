import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';
import { TokenContext } from '../../context/components/Token';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Information() {
    const { id } = useParams('id');
    const [loder, setLodder] = useState(true);
    const [product, setProduct] = useState({});
    const { token } = useContext(TokenContext)
    const getProudct = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products/${id}`
        )
        setProduct(data.product)
        setLodder(false)
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
    console.log(product)
    return (
        <>
            {
                <div className=' bg-prodect-information-cart'>
                    <div className='w-auto d-flex justify-content-center align-items-center gap-xl-5 gap-lg-2 gap-sm-1 py-5 flex-wrap flex-lg-nowrap  container'>
                        <img src={product.mainImage.secure_url} alt="photo" className='rounded card-img-top product-shadow w-auto h-auto my-4' />
                        <div className='w-auto border border-dark rounded h-auto bg-product-information'>
                            <h1 className='border-bottom border-dark p-3 fs-2 px-3'>{product.name}</h1>
                            {
                                (product.finalPrice < product.price) ? <div className='d-flex gap-5 px-3'>
                                    <h1 className='border-bottom border-dark p-3 fs-2 text-decoration-line-through '>{product.price}$</h1>
                                    <h1 className='border-bottom border-dark p-3 fs-2 '>{product.finalPrice}$</h1>
                                </div> :
                                    <h1 className='border-bottom border-dark p-3 fs-2 '>{product.price}$</h1>
                            }
                            <p className='px-lg-3 p-sm-1 p-lg-3 px-sm-0 py-5 w-auto h-auto'>{product.description}</p>
                            <button
                                type="submit"
                                className="btn btn-success m-3 btn-hover"
                                onClick={() => handeladd(product.id)}
                            >
                                add product
                            </button>
                            <div id="liveAlertPlaceholder" className="feedpack m-lg-3 m-sm-helf px-lg-3 p-sm-1 p-lg-3 px-sm-0 border border-danger rounded w-auto h-auto">


                                <h1 className='border-bottom border-danger'>feedpack</h1>
                                {





                                    product.reviews.map(feedpack => (
                                        <div className='d-flex align-items-center p-sm-1 px-lg-3 m-sm-helf m-lg-3 px-sm-0  col-lg-12 cpl-sm-4 flex-wrap bg-feedback w-auto h-auto '>
                                            <h3>{feedpack.createdBy.userName}:</h3>
                                            <h5 className='font-family '>{feedpack.comment}</h5>
                                        </div>
                                    )
                                    )
                                }
                            </div>


                        </div>
                    </div>
                    <div className='d-flex d-flex justify-content-center gap-5 flex-wrap'>
                        {
                            product.subImages.map(image =>
                                <div className=' mb-5 aspect-ratio-21x9'>
                                    <img src={image.secure_url} className='rounded product-shadow ' alt="image" />
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Information
