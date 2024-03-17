import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Link } from "react-floating-action-button";
import { FaPlus } from "react-icons/fa6";
import moment from "moment";
import AxiosService from "../utils/ApiService";
import LoadingSpinner from "../components/Spinner";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

function EmployeeList() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  const [employees, setEmployees] = useState([]);
  const [wholeEmployees, setWholeEmployees] = useState([]);
  const getAllEmployee = async () => {
    try {
      setIsLoading(true);
      const res = await AxiosService.get("/emp/all");
      console.log("res==>", res);
      setEmployees([...res?.data?.allEmps]);
      setWholeEmployees([...res?.data?.allEmps]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmp = async (ev, emp) => {
    ev.preventDefault();
    try {
      const res = AxiosService.delete(`/emp/delete/${emp?._id}`);
      console.log(res);
      toast.success(emp?.userName + " employees has been deleted successfully");
      getAllEmployee();
    } catch (error) {
      console.log("delete", error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  useEffect(() => {
    const filterEmp = wholeEmployees.filter((emp) =>
      emp.userName.toLowerCase().includes(search)
    );
    setEmployees(filterEmp);
  }, [search]);

  return (
    <>
      <ToastContainer position="top-right" />
      <div>
        {userData?.role === "admin" && userData?.firstName && (
          <div className="d-flex justify-content-end align-items-center my-4">
            <input
              type="text"
              value={search}
              placeholder="Search by name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary ms-3"
              onClick={() => navigate("/createEmployee")}
            >
              ADD EMPLOYEE
            </button>
          </div>
        )}

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Designation</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((emp, index) => (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>
                    {emp.imageUrl?.[0]?.url ? (
                      <img
                        src={emp.imageUrl?.[0]?.url}
                        alt="image"
                        className="imgage-thumbnail"
                      />
                    ) : (
                      <FaUserCircle size={"2em"} color={"gray"} />
                    )}
                  </td>
                  <td>{emp.userName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.course?.join(",")}</td>
                  <td>{emp.createdAt?.split("T")?.[0]}</td>
                  <td>
                    <CiEdit
                      size={"2em"}
                      color={"blue"}
                      className="icons"
                      onClick={() => navigate("/editEmp/" + emp._id)}
                    />

                    <MdDeleteOutline
                      size={"2em"}
                      color={"red"}
                      className="ps-1 icons"
                      onClick={(e) => deleteEmp(e, emp)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeList;
