import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
// import 'swiper/swiper-bundle.min.css';


const ProductCard = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='product__card'>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={50}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 nurik"
            >
                {product.images.filter((url) => url.length).map((url, idx) => {
                    const imageUrl = `${process.env.REACT_APP_IMAGE_URL}${url}`;

                    console.log("Constructed Image URL:", imageUrl);
                    return (
                        <SwiperSlide key={idx}>
                            {!loaded && <div style={{ height: '800px', width: "100%", background: "silver" }}></div>}
                            <img src={imageUrl} alt={url} onLoad={() => setLoaded(true)} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper swiper-nurs product"
            >
                <div className='swiper__opacity'>
                    {product.images.filter((url) => url.length).map((url, idx) => (
                        <SwiperSlide key={idx}>
                            {!loaded && <div style={{ height: '200px', width: "102px", background: "silver" }}> </div>}
                            <img src={`${process.env.REACT_APP_IMAGE_URL}${url}`} alt={url} onLoad={() => setLoaded(true)} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
};

export default ProductCard;
