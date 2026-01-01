import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { createContext, useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import ProductUpload from "./Pages/ProductUpload/ProductUpload";
import HomeBanner from "./Pages/HomeBanner/HomeBanner";
import BannerAdsManager from "./Pages/HomeBanner/HomeBanner";
import CategoryManagement from "./Pages/CategoryList/CategoryList";
import UsersPage from "./Pages/Users/Users";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Verify from "./Pages/Verify/Verify";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";

const MyContext = createContext();
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    // ✅ Listen for when the tab/window is closed
    const handleBeforeUnload = () => {
      // sessionStorage automatically clears, but we can also manually clear
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const router = createHashRouter([
    {
      path: "/dashboard",
      exact: true,
      element: (
        <>
          <ProtectedRoute>
            <section className=" py-3 px-3">
              <Header />
              <div className="contentMain flex w-full">
                <div
                  className={`overflow-hidden sidebarWrapper ${
                    isSideBarOpen === true
                      ? "w-[16%]"
                      : "w-[0px] opacity-0 pointer-events-none"
                  } transition-all`}
                >
                  <SideBar />
                </div>
                <div
                  className={`contentRight py-3 px-3 ${
                    isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                  } transition-all`}
                >
                  <Dashboard />
                </div>
              </div>
            </section>
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/forgotPassword",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify",
      exact: true,
      element: (
        <>
          <Verify />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <ProtectedRoute>
            <section className="main py-3 px-3">
              <Header />
              <div className="contentMain flex w-full">
                <div
                  className={`overflow-hidden sidebarWrapper ${
                    isSideBarOpen === true
                      ? "w-[16%]"
                      : "w-[0px] opacity-0 pointer-events-none"
                  } transition-all`}
                >
                  <SideBar />
                </div>
                <div
                  className={`contentRight py-3 px-3 ${
                    isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                  } transition-all`}
                >
                  <Products />
                </div>
              </div>
            </section>
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/products/add",
      exact: true,
      element: (
        <>
          <ProtectedRoute>
            <section className="main py-3 px-3">
              <Header />
              <div className="contentMain flex w-full">
                <div
                  className={`overflow-hidden sidebarWrapper ${
                    isSideBarOpen === true
                      ? "w-[16%]"
                      : "w-[0px] opacity-0 pointer-events-none"
                  } transition-all`}
                >
                  <SideBar />
                </div>
                <div
                  className={`contentRight py-3 px-3 ${
                    isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                  } transition-all`}
                >
                  <ProductUpload />
                </div>
              </div>
            </section>
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/homeSlide",
      exact: true,
      element: (
        <>
          <section className="main py-3 px-3">
            <Header />
            <div className="contentMain flex w-full">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSideBarOpen === true
                    ? "w-[16%]"
                    : "w-[0px] opacity-0 pointer-events-none"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-3 px-3 ${
                  isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                } transition-all`}
              >
                <BannerAdsManager />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/categories",
      exact: true,
      element: (
        <>
          <section className="main py-3 px-3">
            <Header />
            <div className="contentMain flex w-full">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSideBarOpen === true
                    ? "w-[16%]"
                    : "w-[0px] opacity-0 pointer-events-none"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-3 px-3 ${
                  isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                } transition-all`}
              >
                <CategoryManagement />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <ProtectedRoute>
            <section className="main py-3 px-3">
              <Header />
              <div className="contentMain flex w-full">
                <div
                  className={`overflow-hidden sidebarWrapper ${
                    isSideBarOpen === true
                      ? "w-[16%]"
                      : "w-[0px] opacity-0 pointer-events-none"
                  } transition-all`}
                >
                  <SideBar />
                </div>
                <div
                  className={`contentRight py-3 px-3 ${
                    isSideBarOpen === false ? "w-[100%]" : "w-[84%]"
                  } transition-all`}
                >
                  <UsersPage />
                </div>
              </div>
            </section>
          </ProtectedRoute>
        </>
      ),
    },
  ]);

  const values = { isSideBarOpen, setIsSideBarOpen, isLogin, setIsLogin };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
