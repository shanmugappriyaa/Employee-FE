import React, { useEffect } from "react";
import { ImBlogger2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
function Header() {
  let navigate = useNavigate();
  let logout = useLogout();

  let userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log("userData===>", userData);

  return (
    <div className="">
      <nav class="navbar navbar-light bg-primary p-2">
        <div className="col-6 d-flex text-align-center p-2">
          <h4
            className="text-white show-hover"
            onClick={() => navigate("/dashboard")}
          >
            {" "}
            <ImBlogger2 /> Home
          </h4>

          <h4
            className="text-white ms-3 show-hover"
            onClick={() => navigate("/empList")}
          >
            {" "}
            Employee List
          </h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {userData?.firstName ? (
            <>
              <h3 className="userbutton">{userData?.firstName}</h3>
              <button onClick={logout} className="btn btn-danger">
                {" "}
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-warning me-4"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </button>
              <button
                className="btn btn-warning "
                onClick={() => navigate("/registration")}
              >
                {" "}
                Registration
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
