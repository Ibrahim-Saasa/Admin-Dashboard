import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TbSlideshow } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";

const SideBar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const context = useContext(MyContext);

  return (
    <>
      <div className="sidebar fixed top-0 left-0 bg-[#fff0f5] h-full border-r border-[#9ec49e] px-6 z-[60]">
        <div className="w-full">
          <Link to="/">
            <img src={logo} className="w-[170px] " />
          </Link>
        </div>
        <ul className="mt-4 ">
          <li>
            <Link to="/users">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2">
                <TbLayoutDashboardFilled className="text-[20px]" />
                <span>Dashoard </span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2"
              onClick={() => isOpenSubMenu(1)}
            >
              <TbSlideshow className="text-[20px]" />
              <span>Home Slide </span>
              <FaAngleDown
                className={`transition-all ml-auto ${
                  subMenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeSlide/add">
                    <Button className="w-full !capitalize !justify-start !flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Add Home Banner Slide
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/homeSlide">
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Home Slides List
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2">
                <FaUsers className="text-[20px]" />
                <span>Users </span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2"
              onClick={() => isOpenSubMenu(2)}
            >
              <FaProductHunt className="text-[20px]" />
              <span>Products</span>
              <FaAngleDown
                className={`transition-all ml-auto ${
                  subMenuIndex === 2 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={subMenuIndex === 2 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  {" "}
                  <Link to="/products">
                    <Button className="w-full !capitalize !justify-start !flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/product/add">
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Product Upload
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2"
              onClick={() => isOpenSubMenu(3)}
            >
              <MdCategory className="text-[20px]" />
              <span>Categories</span>
              <FaAngleDown
                className={`transition-all ml-auto ${
                  subMenuIndex === 3 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/categories">
                    <Button className="w-full !capitalize !justify-start !flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/category/add">
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Add a Category
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/category/subCategory">
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Sub Category
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/category/subCategory/add">
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[13px] !text-[#7e9f7e] !font-[500] !pl-5">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[green]"></span>
                      Add a Sub Category
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2">
                <FaShoppingBag className="text-[20px]" />
                <span>Orders </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[18px] !text-[#7e9f7e] !font-[500] !items-center !py-2">
                <IoLogOut className="text-[20px]" />
                <span>Logout </span>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
