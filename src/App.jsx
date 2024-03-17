import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { base_url } from "./utils/ApiService";
import AddEditEmployee from "./pages/AddEditEmployee";

function App() {
  axios.defaults.baseURL = base_url;
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/empList" element={<EmployeeList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createEmployee" element={<AddEditEmployee />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editEmp/:id" element={<AddEditEmployee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
