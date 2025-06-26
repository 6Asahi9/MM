import React, { useEffect } from "react";
import "./Login.css";
import sleepingCat from "../assets/Gif/cat-sleep.gif";
import "boxicons/css/boxicons.min.css";

const Login = () => {
  useEffect(() => {
    const container = document.getElementById("container");
    const signUpBtn = document.getElementById("signUp");
    const signInBtn = document.getElementById("signIn");

    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    // Cleanup
    return () => {
      signUpBtn.removeEventListener("click", () => {});
      signInBtn.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="login-page">
      <div className="wrapper">
        <img src={sleepingCat} alt="Sleeping Cat" id="sleeping-cat-gif" />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <p>Register with other Platforms!</p>
              <div className="social-icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <div className="forgot-link">
                <a href="#">Forgot your password?</a>
              </div>
              <p>Login with other Platforms!</p>
              <div className="social-icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To stay connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Don't have an account? Register now and start sailing with us!
                </p>
                <button className="ghost" id="signUp">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
