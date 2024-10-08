import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import banner from './img/banner.jpg';
import banner1 from './img/атоми.png';
import banner2 from './img/кроссовки ванс.jpg';
import banner3 from './img/одежда.jpg';
import banner4 from './img/хуфвей.webp'
import banner5 from './img/самсунг а24.jpg'
import { Navigation, Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';


const Banner = () => {


    return (
        <section>
            <Swiper
                navigation={true}
                mousewheel={false}
                pagination={{
                    clickable: true,
                }}
                keyboard={true}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 3000
                }}
                className="mySwiper banner"
                modules= {[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            >
                <SwiperSlide>
                    <div className='banner__bg'>
                        <img className='banner__img' src={banner4} alt='#'/>
                        <h2 className='banner__title'>Новинки</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='banner__bg'>
                        <img className='banner__img'  src={banner1} alt='#'/>
                        <h2 className='banner__title'>Новинки</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className='banner__bg'>
                    <img className='banner__img'  src={banner2} alt='#'/>
                    <h2 className='banner__title'>Новинки</h2>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='banner__bg'>
                        <img className='banner__img'  src={banner3} alt='#'/>
                        <h2 className='banner__title'>Новинки</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='banner__bg'>
                        <img className='banner__img'  src={banner5} alt='#'/>
                        <h2 className='banner__title'>Новинки</h2>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;
