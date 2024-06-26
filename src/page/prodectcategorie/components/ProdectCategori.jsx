import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Loder from '../../../components/Loder';
import { TokenContext } from '../../../context/Token';
import { Bounce, toast } from 'react-toastify';
import useResource from '../../../hooks/useResource';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
function ProdectCategori() {
  const { token } = useContext(TokenContext)
  const { id } = useParams('id');
  const { name } = useParams('name');
  const { product, loading, setLoading } = useResource(id)
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
  if (loading) {
    return < Loder />
  }
  return (
    <div className='bg-FFD498'>
      <h1 className='d-flex text-dark justify-content-center py-2'>{name}</h1>
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center `} key={id} >
        {product.length ?
          product.map(product =>
            <div className={`card width-cart mt-2 mb-4 bg-prodect-information opacity-20 shadow ${product._id}`} >

              <NavLink to={`/information/${product._id}`}>
                <img src={product.mainImage.secure_url} className={`image-hover-shrinks card-img-top position-relative aspect-ratio-4x3`} alt="product mainImage" />
              </NavLink>
              <div className="card-body">
                <h5 className="card-title text-white">{product.name}</h5>
                <div className='d-flex justify-content-center pb-2'>
                  <Rating
                    initialRating={product.avgRating}
                    readonly
                    emptySymbol={<FaStar className="text-muted" />}
                    fullSymbol={<FaStar className="text-warning" />}
                  />

                </div>
                {
                  (product.finalPrice < product.price) ? <div>
                    <h5 className="card-title text-white position-absolute start-0 top-0 bg-prodect-information p-2 m-2 border border-1 rounded">{product.finalPrice}$</h5>
                  </div> : <h5 className="card-title text-white position-absolute start-0 top-0 bg-prodect-information p-2 m-2 border border-1 rounded">{product.price}$</h5>
                }
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
          ) : <spam className="card-title fs-2 my-2 text-danger">empty product</spam>
        }
      </div>
    </div>
  )
}

export default ProdectCategori
