import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(TokenContext)
    const getProducts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/products`
            );
            setProducts(data.products);
            setLoading(false);
        }
        catch (error) {
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
            setLoading(false);
        }
    }
    const handelcahnge = async (productId) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/cart`
                , {
                    productId
                }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            })
            if (data.message == "success") {
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
        }
        catch (error) {
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
            setLoading(false);
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    if (loading) {
        return < Loder />
    }
    return (
        <div className="bg-Categores">
            <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center `}  >
                {products.length ?
                    products.map(product =>
                        <div className={`card width-cart mt-2 mb-4 bg-prodect-cart opacity-20 product-shadow ${products._id}`} >
                            <img src={product.mainImage.secure_url} className={`card-img-top position-relative`} alt="product mainImage" />
                            <div className="card-body">
                                <h5 className="card-title text-white">{product.name}</h5>
                                <h5 className="card-title text-white position-absolute end-0 top-0  bg-prodect-cart p-2 m-2 border border-1 rounded">{product.price}$</h5>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-secondary btn-hover"
                                onClick={() => handelcahnge(product.id)}
                            >
                                add product
                            </button>

                        </div>
                    ) : <spam className="card-title fs-2 my-2 text-danger">empty product</spam>
                }
            </div>
        </div>
    )
}

export default Products
