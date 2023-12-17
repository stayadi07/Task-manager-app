// SignIn.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tree from "../../Assets/Rectangle-4.png";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../Reducers/authSlice";
import "./styles.css";

const SignIn = () => {
  const dispatch = useDispatch();
  let history = useNavigate();

  // State to hold user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to authenticate the user
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Authentication successful, dispatch user and token to Redux store

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        history("/homepage");
        console.log("Logged in successfully");
      } else {
        // Authentication failed, display error message
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during signin:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Task Manager
          </a>
        </nav>

        <form action="" onSubmit={handleSignIn}>
          <section className="vh-100 login-container">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">
                      <h3 className="mb-5 login-text">Login</h3>

                      <img src={Tree} className="login-card" alt="" />

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="typeEmailX-2"
                          className="form-control form-control-lg w-100"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="typePasswordX-2"
                          className="form-control form-control-lg w-100"
                          name="password"
                          value={formData.password}
                          placeholder="Password"
                          required
                          onChange={handleChange}
                          minLength="8"
                        />
                      </div>

                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                      {error && (
                        <p
                          className="mt-4 error-message"
                          style={{ color: "red" }}
                        >
                          {error}
                        </p>
                      )}

                      <hr className="my-4" />
                      <div className="bottom-container">
                        <p>
                          Don't have an account?
                          <Link to="/register" className="signup-link">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
