/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss";

function Layout() {
  
  return (
    <>
      <div className="layout">
        <Header />
        <main className="main">
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
