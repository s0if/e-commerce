import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, auth } = useContext(TokenContext)
    const [numberPage, setNumberPage] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1)
    const getProducts = async (Page) => {
        setNumberOfPage(page);
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/products?page=${Page}&limit=4`
            );
            setProducts(data);
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

    const page = () => {
        if (products && products.total) {
            const totalPages = products.total / 4;
            const pagesArray = [];
            for (let i = 1; i <= totalPages; i++) {
                pagesArray.push(i);
            }
            setNumberPage(pagesArray);
        }
        else console.log('else')
    };
    useEffect(() => {
        page()
    }, [products])
    useEffect(() => {
        getProducts(1)
    }, [])
    if (loading) {
        return < Loder />
    }
    console.log(numberOfPage)
    return (
        <>
            <div className="bg-Categores">
                <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center ${auth.id}`}  >
                    {products.products.length ?
                        products.products.map(product =>
                            <div className={`card width-cart mt-2 mb-4 bg-prodect-cart opacity-20 product-shadow ${product._id}`} >
                                <img src={product.mainImage.secure_url} className={`card-img-top position-relative w-photo`} alt="product mainImage" />
                                <div className="card-body">
                                    <h5 className="card-title text-white">{product.name}</h5>
                                    <h5 className="card-title text-white position-absolute satrt-0 top-0  bg-prodect-cart p-2 m-2 border border-1 rounded">{product.price}$</h5>
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
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => getProducts(numberOfPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">«</span>
                        </button>
                    </li>
                    {numberPage.map(page => {
                        return <li className="page-item"><button className="page-link" onClick={() => getProducts(page)}>{page}</button></li>
                    })}
                    <li className="page-item">
                        <button className="page-link" onClick={() => getProducts(numberOfPage + 1)} aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </button>
                    </li>
                </ul>
            </nav>


        </>
    )
}

export default Products
