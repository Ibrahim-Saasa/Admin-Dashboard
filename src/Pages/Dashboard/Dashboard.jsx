import React, { useContext, useState } from "react";
import DashboardBoxes from "../../components/DashboardBoxes/DashboardBoxes";
import { MdWavingHand } from "react-icons/md";
import dashboard from "../../assets/dashboard.png";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import OrderManagement from "../../components/Table/orderManagement";
import ProductManagement from "../../components/Table/ProductTable";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Pie,
  PieChart,
} from "recharts";
import { MyContext } from "../../App";

const Dashboard = () => {
  const [chart1Data, setChart1Data] = useState([
    {
      name: "January",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Febuary",
      uv: 2500,
      pv: 1500,
      amt: 500,
    },
    {
      name: "March",
      uv: 3000,
      pv: 1598,
      amt: 110,
    },
    {
      name: "April",
      uv: 1000,
      pv: 2300,
      amt: 2400,
    },
    {
      name: "May",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "June",
      uv: 6000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "July",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "August",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "September",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "October",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "November",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "December",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ]);
  const data01 = [
    { value: 37 },
    { value: 12 },
    { value: 26 },
    { value: 10 },
    { value: 5 },
    { value: 5 },
  ];

  const data02 = [
    { name: "Electronics", value: 37 },
    { name: "Fashion", value: 12 },
    { name: "Home", value: 26 },
    { name: "Accessories", value: 10 },
    { name: "Tools", value: 5 },
    { name: "Jewellery", value: 5 },
  ];
  const data03 = [
    { value: 26 },
    { value: 23 },
    { value: 10 },
    { value: 16 },
    { value: 27 },
  ];

  const data04 = [
    { name: "Asia", value: 26 },
    { name: "Europe", value: 23 },
    { name: "Africa", value: 10 },
    { name: "South America", value: 16 },
    { name: "North America", value: 27 },
  ];

  const context = useContext(MyContext);

  return (
    <>
      <div className="w-full py-2 px-5 border-1 rounded-md flex items-center gap-8 mb-5 justify-between glass">
        <div className="info  gap-2">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning, <br /> Ibrahim
          </h1>
          <MdWavingHand className="text-[35px] text-[#c0c029] !mt-2 mb-2" />
          <p>
            Here is what's happening in your store. See the statistics at once.
          </p>

          <Button className="titanium-btn !text-black !capitalize ">
            <FaPlus className="mr-2" /> Add Product
          </Button>
        </div>
        <img src={dashboard} alt="img" className="w-[250px]" />
      </div>
      <DashboardBoxes />
      <div className="card my-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
        <OrderManagement />
      </div>

      <ProductManagement />
      <div className="card my-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] glass border-1 border-[#9ec49e] rounded-md p-4 ">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Total Users & Sales
          </h1>
        </div>
        <div className="flex justify-left gap-5 items-center mb-6 p-4 pt-0">
          <span className="flex items-center">
            <span className="block w-[10px] h-[10px] rounded-full bg-[#82ca9d] mr-2"></span>
            Total Users
          </span>
          <span className="flex items-center">
            <span className="block w-[10px] h-[10px] rounded-full bg-[#8884d8] mr-2"></span>
            Total Sales
          </span>
        </div>
        <LineChart
          width={context.isSideBarOpen === true ? 1200 : 1400}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" ticket={{ fontsize: 12 }} />
          <YAxis yAxisId="left" ticket={{ fontsize: 12 }} />
          {/* <YAxis yAxisId="right" orientation="right" /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            strokeWidth={4}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            strokeWidth={4}
          />
        </LineChart>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Total Revenue & Profit
          </h1>
        </div>
        <div className="flex justify-left gap-5 items-center mb-6 p-4 pt-0">
          <span className="flex items-center">
            <span className="block w-[10px] h-[10px] rounded-full bg-[#82ca9d] mr-2"></span>
            Total Revenue
          </span>
          <span className="flex items-center">
            <span className="block w-[10px] h-[10px] rounded-full bg-[#8884d8] mr-2"></span>
            Total Profit
          </span>
        </div>
        <BarChart
          width={context.isSideBarOpen === true ? 1200 : 1400}
          height={500}
          data={chart1Data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
        <div className="w-full flex items-center justify-center">
          <div className="w-[50%]">
            <div className="flex justify-center items-center p-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Total Profit Distribution
              </h1>
            </div>
            <div className="flex justify-center gap-5 items-center mb-6 p-4 pt-0">
              <span className="flex items-center">
                <span className="block w-[10px] h-[10px] rounded-full bg-[#82ca9d] mr-2"></span>
                Continent
              </span>
              <span className="flex items-center">
                <span className="block w-[10px] h-[10px] rounded-full bg-[#8884d8] mr-2"></span>
                Percentage
              </span>
            </div>
            <div className="flex justify-center items-center">
              <PieChart width={600} height={600}>
                <Tooltip />
                <Pie
                  data={data04}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  fill="#8884d8"
                />
                <Pie
                  data={data03}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={150}
                  outerRadius={200}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="flex justify-center items-center p-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Revenue By Category
              </h1>
            </div>
            <div className="flex justify-center gap-5 items-center mb-6 p-4 pt-0">
              <span className="flex items-center">
                <span className="block w-[10px] h-[10px] rounded-full bg-[#82ca9d] mr-2"></span>
                Revenue
              </span>
              <span className="flex items-center">
                <span className="block w-[10px] h-[10px] rounded-full bg-[#8884d8] mr-2"></span>
                Category
              </span>
            </div>
            <div className="flex justify-center items-center">
              <PieChart width={600} height={600}>
                <Tooltip />
                <Pie
                  data={data01}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  fill="#8884d8"
                />
                <Pie
                  data={data02}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={150}
                  outerRadius={200}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
