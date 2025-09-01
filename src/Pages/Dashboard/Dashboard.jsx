import React from "react";
import DashboardBoxes from "../../components/DashboardBoxes/DashboardBoxes";
import { MdWavingHand } from "react-icons/md";
import dashboard from "../../assets/dashboard.png";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import OrderManagement from "../../components/Table/orderManagement";

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
        {/* <table class="w-full text-sm text-left rtl:text-right  ">
            <thead class="text-md bg-[#9ec49e] border-t border-[#000]">
              <tr className="border-b  border-[#]">
                <th scope="col" class="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3">
                  Items
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[#9ec49e] ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="  border-b border-[#9ec49e] ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">White</td>
                <td class="px-6 py-4">Laptop PC</td>
                <td class="px-6 py-4">$1999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="  border-b border-[#9ec49e] ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Magic Mouse 2
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="  border-b border-[#9ec49e] ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Google Pixel Phone
                </th>
                <td class="px-6 py-4">Gray</td>
                <td class="px-6 py-4">Phone</td>
                <td class="px-6 py-4">$799</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Apple Watch 5
                </th>
                <td class="px-6 py-4">Red</td>
                <td class="px-6 py-4">Wearables</td>
                <td class="px-6 py-4">$999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table> */}
        <OrderManagement />
      </div>
    </>
  );
};

export default Dashboard;
