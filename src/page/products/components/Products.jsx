import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../../context/Token';
import Loder from '../../../components/Loder';
import { Bounce, toast } from 'react-toastify';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, auth } = useContext(TokenContext);
    const [numberPage, setNumberPage] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const totalPages = Math.ceil(products.total / 4);
    const [sort, setSort] = useState('name');
    const [search, setSearch] = useState('')

    const getProducts = async (page) => {
        setNumberOfPage(page);

        try {

            let endpoint = `${import.meta.env.VITE_API}/products?page=${page}&limit=4`
            if (search) {
                endpoint += `&search=${encodeURIComponent(search)}`;
            }
            if (sort) {
                endpoint += `&sort=${encodeURIComponent(sort)}`;
            }
            const { data } = await axios.get(endpoint);
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
        }
    };

    useEffect(() => {
        page();
    }, [products]);

    useEffect(() => {
        getProducts(1);
    }, [sort, search, 2000]);
    if (loading) {
        return <Loder />;
    }

    return (
        <div className='d-flex flex-column '>
            <div className="bg-Categores">
                <div>


                    <div className='d-flex align-items-center justify-content-center gap-3 flex-lg flex-sm m-3'>
                        <div className='d-flex align-items-center justify-content-around flex-sm flex-lg w-100 gap-3'>
                            <div>
                                <label className='fs-3 me-2 text-335495'>search</label>
                                <input
                                    className=" h-fitContent "
                                    type="text"
                                    value={search}
                                    name="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <a className="nav-link bg-335495 dropdown-toggle fs-4 border border-2 px-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                sort
                            </a>
                            <ul className="dropdown-menu">
                                <li >
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('')}
                                    >
                                        defult
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('price')}
                                    >
                                        price
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('-price')}
                                    >
                                        -price
                                    </button>

                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('name')}
                                    >
                                        -name
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('discount')}
                                    >
                                        discount
                                    </button>
                                </li>
                                < li>
                                    <button
                                        type="submit"
                                        className="w-75 mx-2 btn-hover-success"
                                        onClick={() => setSort('-discount')}
                                    >
                                        -discount
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
                <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center ${auth.id}`}  >
                    {products.products.length ?
                        products.products.map(product =>
                            <div className={`card width-cart mt-2 mb-4 bg-prodect-information opacity-20 shadow position-relative ${product._id}`} key={product._id}>
                                <NavLink to={`/information/${product.id}`}>
                                    <img src={product.mainImage.secure_url} className={`card-img-top position-relative aspect-ratio-4x3 image-hover-shrinks`} alt="product mainImage" />
                                </NavLink>
                                <div className="card-body">
                                    <h5 className="card-title text-white">{product.name}</h5>
                                    <h5 className="card-title text-white position-absolute satrt-0 top-0  bg-prodect-information p-2 m-2 border border-1 rounded">{product.finalPrice}$</h5>
                                </div>
                                <div className='d-flex justify-content-center pb-2'>
                                    <Rating
                                        initialRating={product.avgRating}
                                        readonly
                                        emptySymbol={<FaStar className="text-muted" />}
                                        fullSymbol={<FaStar className="text-warning" />}
                                    />

                                </div>
                                {
                                    token && <button
                                        type="submit"
                                        className="btn btn-secondary btn-hover"
                                        onClick={() => handelcahnge(product.id)}
                                    >
                                        add product
                                    </button>
                                }

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
