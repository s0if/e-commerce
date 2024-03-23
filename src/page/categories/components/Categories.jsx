import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/pagination';
import Loder from "../../../components/Loder";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
    setCategories(data.categories);
    setLoader(false);
  }
  useEffect(() => {
    getCategories()
  }, [])
  if (loader) {
    return < Loder />
  }
  return (
    <div>


      <Swiper

        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}

        className="mySwiper p-5"

      >
        {
          categories.map(category =>
            <SwiperSlide key={category.id}>
              <div
                className="categories"
                key={category._id}
              >
                <img src={category.image.secure_url} />
              </div>
            </SwiperSlide>
          )
        }
      </Swiper>



      {
        // categories.map(category =>
        //   <div
        //     className="categories"
        //     key={category._id}
        //   >
        //     <img src={category.image.secure_url} />
        //   </div>
        // )
      }
    </div>
  )
}

export default Categories
