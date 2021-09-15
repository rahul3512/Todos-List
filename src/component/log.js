import React, { useState } from "react";
import Bg from "../Assets/Bg";
import Navbar from "./navbar";
import { app } from "../server";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

function Log() {
  const alert = useAlert();
  var history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    logEmail: "",
    logPassword: "",
    loading: false,
    updated: false,
    error: "",
    login: true,
    bgcolor: "rgb(193 213 207)",
  });

  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  function register() {
    if (values.password === values.confirmPassword) {
      setValues({ ...values, loading: true });
      app
        .post("/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert.show("Register Successfully ", {
              type: "success",
              timeout: "2000",
            });

            setValues({
              ...values,
              loading: false,
              updated: true,
              login: true,
            });
            history.push("/");
          } else {
            alert.show("Registration Failed.", {
              type: "error",
              timeout: "2000",
            });
            setValues({
              ...values,
              loading: false,
              updated: false,
              error: res.error,
            });
          }
        })
        .catch((err) => {
          alert.show("Technical issue .. :(", {
            type: "error",
            timeout: "2000",
          });
          setValues({ ...values, loading: false, updated: false, error: err });
        });
    } else {
      alert.show("Password Not Matched", {
        type: "error",
        timeout: "2000",
      });
    }
  }

  const Login = () => {
    setValues({ ...values, loading: true });
    app
      .post("/login", {
        email: values.logEmail,
        password: values.logPassword,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert.show(res.data.msz, {
            timeout: "2000",
            type: "success",
          });
          setValues({ ...values, loading: false, updated: true });
          localStorage.setItem("email", values.logEmail);
          history.push("/");
        } else {
          setValues({ ...values, loading: false });
          alert.show(res.data.msz, {
            type: "error",
            timeout: "2000",
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false, error: err });
      });
  };

  const LoadingMessage = () => {
    return (
      <>
        {values.loading ? (
          <div
            class="row spinner-border text-primary mt-2"
            style={{ marginLeft: "48%" }}
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>

      <Bg />
      <div className="container" style={{ paddingTop: '5rem' }}>

        {LoadingMessage()}
        {values.login ? (
          <div className="row " style={{ zIndex: "5" }}>
            <div
              className="col-lg-6 col-md-10 col-sm-10  m-auto border border-secondary "
              style={{ backgroundColor: values.bgcolor }}
            >
              <div className="form-group col-lg-10  m-auto p-5">
                <h2 className="text-center">Login</h2>

                <label htmlFor="logEmail">Email</label>
                <input
                  type="email"
                  id="logEmail"
                  value={values.logEmail}
                  className="form-control"
                  onChange={handleChange("logEmail")}
                />

                <label htmlFor="logPassword">Password</label>
                <input
                  type="password"
                  id="logPassword"
                  value={values.logPassword}
                  className="form-control"
                  onChange={handleChange("logPassword")}
                />

                <button
                  className="btn btn-success btn-md mt-3 col-lg-12"
                  onClick={Login}
                >
                  Login
                </button>

                <div className="mt-2">
                  don't have an account ?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setValues({ ...values, login: false });
                    }}
                  >
                    {" "}
                    Register here{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row " style={{ zIndex: "5" }}>
            <div
              className="col-lg-6 col-md-10 m-auto border border-secondary "
              style={{
                backgroundColor: values.bgcolor,

              }}
            >
              <div className="form-group col-lg-10  m-auto p-5 ">
                <h2 className="text-center">Register</h2>

                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  className="form-control "
                  onChange={handleChange("name")}
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={values.email}
                  className="form-control"
                  onChange={handleChange("email")}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={values.password}
                  className="form-control"
                  onChange={handleChange("password")}
                />

                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  value={values.confirmPassword}
                  className="form-control"
                  onChange={handleChange("confirmPassword")}
                />

                <button
                  className="btn btn-success btn-md mt-3 col-lg-12"
                  onClick={register}
                >
                  Register
                </button>

                <div className="mt-2">
                  already have an account ?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setValues({ ...values, login: true });
                    }}
                  >
                    {" "}
                    Login here{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Log;
