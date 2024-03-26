import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Loder from '../../../components/Loder';
import { TokenContext } from '../../context/components/Token';

function ProdectCategori() {
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext)
  const { id } = useParams('id');
  const { name } = useParams('name');
  const [product, setProduct] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/products/category/${id}`
    );
    setProduct(data.products);
    setLoading(false);
  }
  useEffect((
    () => {
      getData()
    }
  ),
    []);
  const handelcahnge = async (productId) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/cart`
      , {
        productId
      }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    })
  }
  if (loading) {
    return < Loder />
  }
  return (
    <div className="bg-Categores">
      <h1 className='d-flex text-white justify-content-center py-2'>{name}</h1>
      <div className={`d-flex flex-wrap container gap-xl-5 gap-lg-2 gap-sm-1 w-100 justify-content-center `} key={id} >
        {product.length ?
          product.map(product =>
            <div className={`card width-cart mt-2 mb-4 bg-prodectCategores-cart opacity-20 prodectCategores-shadow ${product._id}`} >
              
              <img src={product.mainImage.secure_url} className={`card-img-top `} alt="product mainImage" />
              <div className="card-body">
                <h5 className="card-title text-white">{product.name}</h5>
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

export default ProdectCategori
