import React from "react";
import "./Login.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

function Login() {
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //     e.preventDefault();
  //     navigate('/home')
  // }

  return (
    <>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        // validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
          // navigate('/pròipròipròipròipròipròipròipròipròipròi')pròipròipròipròipròipròipròipròipròipròip
          // navigate('/customers')
          // window.location.href = "/profile"
          window.location.replace('/home')
        }}
      >
        {(formik) => (
          <div className="login">
            <div className="container-login">
              <div className="header-login">
                <label className="title-label label">Welcome !</label>
                <br></br>
                <label className="label">Sign in to continue</label>
              </div>
              {/* <form className="content-login" > */}
              <Form className="content-login">
                <div className="form-outline mb-4">
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                  />
                </div>
                <div className="form-outline mb-4">
                  <TextField label="Password" name="password" type="password" />
                </div>
                <button type="submit" className="btn btn-block btn-custom mb-2">
                  Sign in
                </button>
                <div className="h-100 d-flex align-items-center justify-content-center container-href-forgot">
                  <i className="bi bi-lock-fill"></i>
                  <a className="href-forgot" href="">
                    Forgot password?
                  </a>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
