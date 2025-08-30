import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const SideBar = () => {
  return (
    <>
      <div className="sidebar fixed top-0 left-0 bg-[#fff0f5] w-[16%] h-full border-r border-[#9ec49e] px-6">
        <div className="w-full">
          <Link to="/">
            <img src={logo} className="w-[170px] " />
          </Link>
        </div>
        <ul className="mt-4 ml-4">
          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[#9ec49e] !font-[600]">
              <TbLayoutDashboardFilled className="text-[16px]" />
              Dashoard
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
