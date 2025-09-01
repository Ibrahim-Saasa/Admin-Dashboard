import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { CiGift } from "react-icons/ci";
import { FaChartSimple } from "react-icons/fa6";
import { MdAreaChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import { MdOutlineSell } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";

const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider "
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f6f5f5] rounded-md border-1 border-[#9ec49e] flex items-center gap-4 ">
            <CiGift className="text-[30px] text-[#6897b7]" />
            <div className="info w-[70%]">
              <h3>New Orders</h3>
              <b>1,378</b>
            </div>
            <FaChartSimple className="text-[30px] text-[#6897b7]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5  cursor-pointer hover:bg-[#f6f5f5] rounded-md border-1 border-[#9ec49e] flex items-center gap-4">
            <MdOutlineSell className="text-[30px] text-[#80b660]" />
            <div className="info w-[70%]">
              <h3>Sales</h3>
              <b>$57,869</b>
            </div>
            <MdAreaChart className="text-[30px] text-[#80b660]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5  cursor-pointer hover:bg-[#f6f5f5] rounded-md border-1 border-[#9ec49e] flex items-center gap-4">
            <RiBankLine className="text-[30px] text-[#af7353]" />
            <div className="info w-[70%]">
              <h3>Revenue</h3>
              <b>$10,950</b>
            </div>
            <MdOutlineStackedLineChart className="text-[30px] text-[#af7353]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5  cursor-pointer hover:bg-[#f6f5f5] rounded-md border-1 border-[#9ec49e] flex items-center gap-4">
            <MdProductionQuantityLimits className="text-[30px] text-[#af9d5b]" />
            <div className="info w-[70%]">
              <h3>Products</h3>
              <b>1,378</b>
            </div>
            <GiChart className="text-[30px] text-[#af9d5b]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
