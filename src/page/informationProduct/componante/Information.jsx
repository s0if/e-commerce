import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loder from '../../../components/Loder';

function Information() {
    const { id } = useParams('id');
    const [loder, setLodder] = useState(true);
    const [product, setProduct] = useState({});
    const getProudct = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API}/products/${id}`
        )
        setProduct(data.product)
        setLodder(false)
    }
    useEffect(() => {
        getProudct()
    }, [])
    if (loder) {
        return <Loder />
    }
    console.log(product)
    return (
        <>
            {<div className=' bg-prodect-information-cart'>
                <div className='w-100 d-flex justify-content-center gap-5 py-5'>
                    <img src={product.mainImage.secure_url} alt="photo" className='w-25 rounded border border-2 product-shadow' />
                    <div className='w-50 border border-dark rounded h-50 bg-product-information mt-4'>
                        <h1 className='border-bottom border-dark p-3 fs-2 px-3'>{product.name}</h1>
                        {
                            (product.finalPrice < product.price) ? <div className='d-flex gap-5 px-3'>
                                <h1 className='border-bottom border-dark p-3 fs-2 text-decoration-line-through '>{product.price}$</h1>
                                <h1 className='border-bottom border-dark p-3 fs-2 '>{product.finalPrice}$</h1>
                            </div> :
                                <h1 className='border-bottom border-dark p-3 fs-2 '>{product.price}$</h1>
                        }

                        <p className='px-3 py-5'>{product.description}</p>
                    </div>
                </div>
                <div className='d-flex d-flex justify-content-center gap-5'>
                    {
                        product.subImages.map(image =>
                            <div className='mb-5'>
                                <img src={image.secure_url} className='rounded product-shadow h-auto' alt="" />
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
