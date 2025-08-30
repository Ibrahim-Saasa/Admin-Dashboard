import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main ">
            <Header />
            <div className="contentMain flex">
              <div className="sidebarWrapper w-[16%]">
                <SideBar />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
