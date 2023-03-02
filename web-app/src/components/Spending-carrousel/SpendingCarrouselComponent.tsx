import React, { useState } from 'react';
import Slider from 'react-slick';
import { Get_SpendingQuery } from 'gql/graphql';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryIcon from './CategoryIcon';
import SpendingModalComponent from './SpendingModalComponent';
import { FcPlus } from 'react-icons/fc';

interface SpendingCarouselComponentProps {
  spendingData?: Get_SpendingQuery;
}

const SpendingCarouselComponent: React.FC<SpendingCarouselComponentProps> = ({
  spendingData,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-6  mb-8 px-8">
        <Slider {...settings}>
          {spendingData?.spendings.map((spending) => {
            return (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between ">
                    <h2 className="text-gray-800 font-semibold text-lg mb-2">
                      {spending.title}
                    </h2>
                    <p className="bg-[#c3e9ac] rounded p-0 w-[41px] h-[41px] cursor-pointer flex justify-center items-center border-transparent hover:bg-[#609f39]">
                      <CategoryIcon
                        categoryName={spending.category.categoryName}
                      />
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Date: {spending.localizedDate}
                  </p>
                  <div className="flex justify-between ">
                    <p className="text-gray-600 text-sm mb-2">
                      Co2 rejeté dans l'atmosphère: {spending.weight}Kg
                    </p>
                    <button onClick={() => setShowModal(true)}>
                      <FcPlus />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      {showModal && (
        <SpendingModalComponent
          setShowModal={setShowModal}
          spendingData={spendingData}
        />
      )}
    </>
  );
};

export default SpendingCarouselComponent;
