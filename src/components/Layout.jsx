import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout() {
  const location = useLocation();
  const [screen, setScreen] = useState(
    location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/registration"
  );

  useEffect(() => {
    setScreen(
      location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/registration"
    );
  }, [location]);
  return (
    <>
      {!screen && <Header />}

      <div class={!screen ? "container" : "container login-bg"}>
        <div className="row d-flex justify-content-center">
          <div className={screen ? "col-12 min-vh-100" : "col-12"}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
