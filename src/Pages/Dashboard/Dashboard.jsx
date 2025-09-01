import React from "react";
import DashboardBoxes from "../../components/DashboardBoxes/DashboardBoxes";
import { MdWavingHand } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <div className="w-full p-5 border-1 rounded-md border-[#9ec49e] flex items-center gap-8 mb-5">
        <div className="info  gap-2">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning, <br /> Ibrahim
          </h1>
          <MdWavingHand className="text-[35px] text-[#c0c029] !mt-2 mb-2" />
          <div className="!block">
            <p>
              Here is what's happening in your store. See the statistics at
              once.
            </p>
          </div>
        </div>
      </div>
      <DashboardBoxes />
    </>
  );
};

export default Dashboard;
