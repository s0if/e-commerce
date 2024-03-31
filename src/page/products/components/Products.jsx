import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../context/components/Token';
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, auth } = useContext(TokenContext);
    const [numberPage, setNumberPage] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const totalPages = Math.ceil(products.total / 4);

    const getProducts = async (page) => {
        setNumberOfPage(page);

        try {
            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/products?page=${page}&limit=4`
            );
            setProducts(data);
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
            setLoading(false);
        }
    };

    const handelcahnge = async (productId) => {
        setLoading(true);
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
            setLoading(false);
        }
    };
    const page = () => {
        if (products && products.total) {
            const pagesArray = [];
            for (let i = 1; i <= totalPages; i++) {
                pagesArray.push(i);
            }
            setNumberPage(pagesArray);
        } else {
            console.log('else');
        }
    };

    useEffect(() => {
        page();
    }, [products]);

    useEffect(() => {
        getProducts(1);
    }, []);
    console.log(products);
    if (loading) {
        return <Loder />;
    }

    return (
        <div className='d-flex flex-column '>
            <div className="bg-Categores">
                <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center ${auth.id}`}  >
                    {products.products.length ?
                        products.products.map(product =>
                            <div className={`card width-cart mt-2 mb-4 bg-prodect-information-cart opacity-20 shadow position-relative ${product._id}`} key={product._id}>
                                <NavLink to={`/information/${product.id}`}>
                                    <img src={product.mainImage.secure_url} className={`card-img-top position-relative aspect-ratio-4x3`} alt="product mainImage" />
                                </NavLink>
                                <div className="card-body">
                                    <h5 className="card-title text-white">{product.name}</h5>
                                    <h5 className="card-title text-white position-absolute satrt-0 top-0  bg-prodect-information-cart p-2 m-2 border border-1 rounded">{product.finalPrice}$</h5>
                                </div>
                                <div>
                                    {product.avgRating}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-hover"
                                    onClick={() => handelcahnge(product.id)}
                                >
                                    add product
                                </button>
                                {
                                    (product.stock > 0) ? '' : <div className='position-absolute bottom-0 top-0 start-0 end-0 overlay'>
                                        <h1 className='bg-danger border border-light rounded p-2'>solid out</h1>
                                    </div>
                                }
                            </div>
                        ) : <span className="card-title fs-2 my-2 text-danger">empty product</span>
                    }
                </div>
            </div>

            <nav aria-label="Page navigation example r">
                <ul className="pagination d-flex bg-pogination rounded justify-content-center mb-0 py-3 ">
                    {
                        (numberOfPage == 1) ?
                            <li className="page-item">
                                <button className="page-link disabled" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </button>
                            </li> :
                            <li className="page-item">
                                <button className="page-link " onClick={() => getProducts(numberOfPage - 1)} aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </button>
                            </li>
                    }

                    {numberPage.map(page => (
                        <li className="page-item" key={page}>
                            <button className="page-link " onClick={() => getProducts(page)}>{page}</button>
                        </li>
                    ))}
                    {
                        (numberOfPage == totalPages) ?
                            <li className="page-item">
                                <button className="page-link disabled" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </button>
                            </li> : <li className="page-item">
                                <button className="page-link " onClick={() => getProducts(numberOfPage + 1)} aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </button>
                            </li>
                    }

                </ul>
            </nav>

        </div>
    );
}

export default Products;
