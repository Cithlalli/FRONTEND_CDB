import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


function Carrusel() {
  return (
    <section className="carrusel">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/img/A2.png" alt="Imagen 1" className="carrusel-imagen" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/A1.jpg" alt="Imagen 2" className="carrusel-imagen" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/A5.png" alt="Imagen 3" className="carrusel-imagen" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Carrusel;
