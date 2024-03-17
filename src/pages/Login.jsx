import axios from "axios";
import React, { useState } from "react";
import { ImBlogger2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import SimpleAxiosService from "../utils/SimpleApiService";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      let res = await SimpleAxiosService.post("user/login", {
        email,
        password,
      });
      if (res.status == 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
        console.log("loginres--->", res);

        navigate("/dashboard");
      } else if (res.status > 400) {
        alert("Login Fails");
      }
    } catch (error) {
      toast.error("Please enter the valid login credential");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="d-flex justify-content-center">
        <div className="col-6 d-flex min-vh-100  justify-content-end align-items-center">
          <div className="col-11 p-5">
            <h4
              className="text-white show-hover text-center"
              onClick={() => navigate("/empList")}
            >
              {" "}
              <ImBlogger2 /> Employee Managment
            </h4>
            <div className="card border-1">
              <div className="card-body shadow">
                <form>
                  <div className="d-flex row p-5 justify-content-center">
                    <h4 className="text-center"> Login </h4>
                    <div className="mt-3">
                      <label className="form-label">User Name</label>
                      <input
                        type="text"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      />
                      <label className="form-label mt-3">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary custom-btn m-4"
                      onClick={(e) => handleLogin(e)}
                    >
                      {" "}
                      sign-in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
