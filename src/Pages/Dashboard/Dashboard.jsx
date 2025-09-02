import React from "react";
import DashboardBoxes from "../../components/DashboardBoxes/DashboardBoxes";
import { MdWavingHand } from "react-icons/md";
import dashboard from "../../assets/dashboard.png";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import OrderManagement from "../../components/Table/orderManagement";
import ProductManagement from "../../components/Table/ProductTable";

const Dashboard = () => {
  return (
    <>
      <div className="w-full py-2 px-5 border-1 rounded-md border-[#9ec49e] flex items-center gap-8 mb-5 justify-between shadow-[0_0_15px_rgba(0,0,0,0.1)]">
        <div className="info  gap-2">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning, <br /> Ibrahim
          </h1>
          <MdWavingHand className="text-[35px] text-[#c0c029] !mt-2 mb-2" />
          <p>
            Here is what's happening in your store. See the statistics at once.
          </p>

          <Button className="btn-blue !capitalize ">
            <FaPlus className="mr-2" /> Add Product
          </Button>
        </div>
        <img src={dashboard} alt="img" className="w-[250px]" />
      </div>
      <DashboardBoxes />
      <div className="card my-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
        <OrderManagement />
      </div>
      {/* <div className="card my-4 shadow-[0_0_15px_rgba(0,0,0,0.1)]"> */}
      <ProductManagement />
      {/* </div> */}
    </>
  );
};

export default Dashboard;
