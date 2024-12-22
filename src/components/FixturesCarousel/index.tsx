import React from 'react';
import Slider from 'react-slick';
import fixtures from './fixtures-data';
import './carouselStyles.css';
import { Carousel } from './Components/carousel';
import {PrevArrow} from "@/components/FixturesCarousel/Components/PrevArrow";
import {NextArrow} from "@/components/FixturesCarousel/Components/NextArrow";


const FixturesCarousel: React.FC = () => {
  const currentWeekNumber = 1; // Your logic to determine the current week
  const currentWeekFixtures = fixtures.filter(
    (fixture) => fixture.game_week_id === currentWeekNumber
  );

  const closestFixtureIndex = currentWeekFixtures.findIndex(
    (fixture) => new Date(fixture.date).getTime() >= new Date().getTime()
  );

  const initialSlide = closestFixtureIndex !== -1 ? closestFixtureIndex : 0;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-white p-5 rounded shadow-xl">
      <h2 className="text-xl font-bold text-center mb-4">Match Fixtures</h2>
      <Slider {...settings}>
        {currentWeekFixtures.map((fixture) => (
          <div key={fixture.id}>
            <Carousel fixture={fixture} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default FixturesCarousel;
