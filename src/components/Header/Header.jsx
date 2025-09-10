import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { FaUser } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { VscAccount } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);

  return (
    <header
      className={`w-full mx-auto h-[auto] py-2 px-5 ${
        context.isSideBarOpen === false
          ? "pl-5 sticky top-0"
          : "pl-64 sticky top-0"
      } shadow-md titanium flex items-center justify-between transition-all !z-50`}
    >
      <div className="part1 ">
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]"
          onClick={() => context.setIsSideBarOpen(!context.isSideBarOpen)}
        >
          <RiMenu2Fill className="text-[18px] text-[#545454]" />
        </Button>
      </div>
      <div className="part2 w-[40%] flex items-center justify-end gap-6">
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]">
          <StyledBadge badgeContent={4}>
            <IoMdNotifications className="text-[18px] text-[#545454]" />
          </StyledBadge>
        </Button>
        {context.isLogin === true ? (
          <div className="relative">
            <div
              className="overflow-hidden cursor-pointer"
              onClick={handleClick}
            >
              <FaUser className=" text-[18px] text-[#545454]" />
            </div>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden cursor-pointer">
                    <FaUser className=" text-[18px] text-[#545454]" />
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">
                      Ibrahim Saasa
                    </h3>
                    <p className="text-[12px] font-[400] opacity-70">
                      ibrahimsaasa@gmail.com
                    </p>
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-3"
              >
                <CiSettings className="text-[25px]" />
                <span className="text-[14px] ">Settings</span>
              </MenuItem>

              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-3"
              >
                <TbLogout2 className="text-[20px]" />
                <span className="text-[14px] ">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/login">
            <Button className="!py-2 !px-5 !text-[#000] !glass titanium !rounded-full">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
    // <header className="w-full h-auto py-2 pl-62 pr-7 shadow-md titanium flex items-center justify-between sticky top-0 z-50">
    //   <div className="part1">
    //     <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]">
    //       <RiMenu2Fill className="text-[18px] text-[#545454]" />
    //     </Button>
    //   </div>
    //   <div className="part2 w-[40%] flex items-center justify-end gap-6">
    //     <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[#000]">
    //       <StyledBadge badgeContent={4} color="secondary">
    //         <IoMdNotifications className="text-[18px] text-[#545454]" />
    //       </StyledBadge>
    //     </Button>
    //     <div className="relative">
    //       <div className="overflow-hidden cursor-pointer" onClick={handleClick}>
    //         <FaUser className=" text-[18px] text-[#545454]" />
    //       </div>
    //       <Menu
    //         anchorEl={anchorEl}
    //         id="account-menu"
    //         open={open}
    //         onClose={handleClose}
    //         onClick={handleClose}
    //         slotProps={{
    //           paper: {
    //             elevation: 0,
    //             sx: {
    //               overflow: "visible",
    //               filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //               mt: 1.5,
    //               "& .MuiAvatar-root": {
    //                 width: 32,
    //                 height: 32,
    //                 ml: -0.5,
    //                 mr: 1,
    //               },
    //               "&::before": {
    //                 content: '""',
    //                 display: "block",
    //                 position: "absolute",
    //                 top: 0,
    //                 right: 14,
    //                 width: 10,
    //                 height: 10,
    //                 bgcolor: "background.paper",
    //                 transform: "translateY(-50%) rotate(45deg)",
    //                 zIndex: 0,
    //               },
    //             },
    //           },
    //         }}
    //         transformOrigin={{ horizontal: "right", vertical: "top" }}
    //         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //       >
    //         <MenuItem onClick={handleClose}>
    //           <div className="flex items-center gap-3">
    //             <div className="overflow-hidden cursor-pointer">
    //               <FaUser className=" text-[18px] text-[#545454]" />
    //             </div>
    //             <div className="info">
    //               <h3 className="text-[15px] font-[500] leading-5">
    //                 Ibrahim Saasa
    //               </h3>
    //               <p className="text-[12px] font-[400] opacity-70">
    //                 ibrahimsaasa@gmail.com
    //               </p>
    //             </div>
    //           </div>
    //         </MenuItem>
    //         <Divider />
    //         <MenuItem onClick={handleClose} className="flex items-center gap-3">
    //           <CiSettings className="text-[25px]" />
    //           <span className="text-[14px] ">Settings</span>
    //         </MenuItem>
    //         <MenuItem onClick={handleClose} className="flex items-center gap-3">
    //           <TbLogout2 className="text-[20px]" />
    //           <span className="text-[14px] ">Sign Out</span>
    //         </MenuItem>
    //       </Menu>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
