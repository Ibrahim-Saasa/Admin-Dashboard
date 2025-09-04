import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { createContext, useState } from "react";

const MyContext = createContext();
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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
  ]);

  const values = { isSideBarOpen, setIsSideBarOpen };

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
