import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { createContext, useState } from "react";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import ProductUpload from "./Pages/ProductUpload/ProductUpload";

const MyContext = createContext();
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main ">
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
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main ">
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
        </>
      ),
    },
    {
      path: "/products/add",
      exact: true,
      element: (
        <>
          <section className="main ">
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
