// Importing useState and FontAwesome for the success icon
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../Reducers/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tree from "../../Assets/Rectangle-4.png";

import "./styles.css";

const SignUp = () => {
  const dispatch = useDispatch();
  let history = useNavigate();
  // State to hold user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to handle error messages
  const [error, setError] = useState("");

  // State for success message
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Perform client-side validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Make a POST request to register the user
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, dispatch user and token to Redux store
        dispatch(setUser(data.data));
        dispatch(setToken(data.token));

        // Show success message and reset form data
        setIsRegistered(true);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Automatically hide success message after 3 seconds
        setTimeout(() => {
          setIsRegistered(false);
          history("/");
        }, 2000);
      } else {
        // Registration failed, display error message
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
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

        <form action="" onSubmit={handleSignUp}>
          <section className="vh-100 login-container">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">
                      <h3 className="mb-5 login-text">Sign Up</h3>

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
                          placeholder="password"
                          required
                          onChange={handleChange}
                          minLength="8"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="typePasswordX-3"
                          className="form-control form-control-lg w-100"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          placeholder="confirm password"
                          required
                          onChange={handleChange}
                          minLength="8"
                        />
                      </div>

                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                      {isRegistered && (
                        <p className="succes-message mt-3 success-message">
                          Registered Successfully
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </p>
                      )}
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
                          Already a user ?
                          <Link to="/" className="signin-link">
                            Sign In
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

export default SignUp;
