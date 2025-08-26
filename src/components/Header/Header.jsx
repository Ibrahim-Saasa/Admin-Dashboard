import React from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <header className="w-full h-[50px] pl-52 pr-7 bg-amber-200 flex items-center justify-between">
      <div className="part1">
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]">
          <RiMenu2Fill className="text-[18px] text-[#545454]" />
        </Button>
      </div>
      <div className="part2 w-[40%] flex items-center justify-end gap-3">
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]">
          <StyledBadge badgeContent={4} color="secondary">
            <IoMdNotifications className="text-[18px] text-[#545454]" />
          </StyledBadge>
        </Button>
        <div className="overflow-hidden cursor-pointer">
          <FaUser className=" text-[18px] text-[#545454]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
