import React from "react";
import Card from "../../HomePageSections/Card/Card";
import styles from "../../../Pages/HomePage/HomePage.module.scss";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/navigation';

const PcSection = ({ count = null }) => {
  // Access the `cards` from the Redux store using useSelector
  const cards = useSelector((state) => state.pcCard.cards);

  // Determine the cards to display based on the count prop
  const displayedCards = count === null ? cards : cards.slice(0, count);

  return (
    <div>
      <div className={styles.cardMain}>
        <Swiper
        className={styles.swiper}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
          }}
          modules={[Autoplay, Navigation]}
        >
          {displayedCards.map((card) => (
            <SwiperSlide className={styles.swiperSlide} key={card.id}>
              <div className={styles.cardContainer}>
                <Card card={card} />
              </div>
            </SwiperSlide>
          ))}
          <div className={`${styles.swiperNav} swiper-button-next`}></div>
        </Swiper>
      </div>
    </div>
  );
};

export default PcSection;
