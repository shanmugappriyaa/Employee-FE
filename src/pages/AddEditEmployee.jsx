import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosService from "../utils/ApiService";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "./Checkbox ";

function AddEditEmployee() {
  let params = useParams();

  const isAddMode = !params?.id;
  const [img, setImg] = useState("");
  console.log("id=========> ", params);

  const initialValues = {
    userName: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "Female",
    course: [],
    imageUrl: [],
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("UserName should not be empty")
      .min(5, "UserName Should be minimum 5 char"),
    email: Yup.string()
      .required("Email should not be empty")
      .email("Invalid email"),
    mobile: Yup.string()
      .required("Mobile No. should not be empty")
      .min(10, "Mobile No. should be 10 digit")
      .max(10, "Mobile No. should be 10 digit"),
    designation: Yup.string().required("Employee designation is required"),
    course: Yup.array().min(1).of(Yup.string().required()).required(),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting, resetForm);
    } else {
      updateUser(params, fields, setSubmitting, resetForm);
    }
  }

  async function createUser(fields, setSubmitting, resetForm) {
    console.log("create user--------> ", fields);
    try {
      let res = await AxiosService.post("/emp/create", {
        ...fields,
      });
      if (res != null) {
        setSubmitting(false);
        if (res?.data?.warnMessasge) {
          toast.error(res?.data?.warnMessasge);
        } else {
          uploadImage(res?.data?.result?._id);
        }
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Error Occurred. Please try again later");
    }
  }

  async function updateUser(param, fields, setSubmitting, resetForm) {
    console.log("update user--------> ", fields, param);

    try {
      let res = await AxiosService.put("/emp/edit/" + param?.id, {
        ...fields,
      });
      if (res != null) {
        setSubmitting(false);
        uploadImage(param?.id);
        toast.success("User detail has been update Successfully");
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Error Occurred. Please try again later");
    }
  }

  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setImg(e.target.files);
  };

  const uploadImage = async (empId) => {
    console.log("img[0]=======> ", img[0]);
    const formData = new FormData();
    formData.set("images", img[0]);
    try {
      const res = await AxiosService.put(`emp/upload/${empId}`, formData);
      console.log(res);
      if (res.status == 200) {
        if (isAddMode) {
          toast.success("Employee has been created successfully");
        }
      } else {
        toast.error("Employee creation fails");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      resetForm
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        const [user, setUser] = useState({});
        const [showPassword, setShowPassword] = useState(false);

        useEffect(() => {
          console.log("isAddMode=====> ", isAddMode);
          if (!isAddMode) {
            console.log("use Effect isAddMode=====> ");
            // get user and set form fields
            AxiosService.get(`/emp/${params.id}`).then((res) => {
              const fields = [
                "userName",
                "email",
                "mobile",
                "designation",
                "gender",
                "course",
              ];
              fields.forEach((field) =>
                setFieldValue(field, res?.data?.emp?.[field], false)
              );
              setUser(res?.data?.emp);
            });
          }
        }, []);

        return (
          <>
            <ToastContainer position="top-right" />
            <Form>
              <h1>{isAddMode ? "Add User" : "Edit User"}</h1>
              <div className="form-row">
                <div className="form-group col-5">
                  <label className="form-label  col-form-label">
                    Enter Your Name
                  </label>
                  <Field
                    name="userName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.userName && touched.userName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-5">
                  <label className="form-label  col-form-label">
                    Enter Your Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-5">
                  <label className="form-label  col-form-label">
                    Enter Your Mobile No.
                  </label>
                  <Field
                    name="mobile"
                    type="text"
                    className={
                      "form-control" +
                      (errors.mobile && touched.mobile ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-5">
                  <label className="form-label col-form-label">
                    Designation
                  </label>
                  <Field
                    name="designation"
                    as="select"
                    className={
                      "form-control" +
                      (errors.designation && touched.designation
                        ? " is-invalid"
                        : "")
                    }
                  >
                    <option value="">Select...</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </Field>
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <label className="form-label col-form-label">Gender</label>
              <div className="form-row">
                <div aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="gender" value="Male" />
                    Male
                  </label>
                  <label className="ms-3">
                    <Field type="radio" name="gender" value="Female" />
                    Female
                  </label>
                </div>
              </div>

              <label className="form-label col-form-label">Courses</label>
              <div className="form-row">
                <div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="course"
                        value="MCA"
                      />
                      MCA
                    </label>
                  </div>

                  <div className="form-check">
                    <label className="form-check-label">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="course"
                        value="BCA"
                      />
                      BCA
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="course"
                        value="BSC"
                      />
                      BSC
                    </label>
                  </div>

                  {/* <div>Picked: {values.gender}</div> */}
                </div>
              </div>

              <label className="form-label col-form-label">
                Upload Employee Image
              </label>
              <div>
                <input
                  type="file"
                  placeholder="Image link"
                  className="mb-2"
                  onChange={handleFileInputChange}
                />
              </div>

              <div className="form-group my-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Save
                </button>
                <Link to="/empList" className="btn btn-link">
                  Cancel
                </Link>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default AddEditEmployee;
