import React, { useEffect } from "react";
import "./Login.css";
import sleepingCat from "../assets/Gif/cat-sleep.gif";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo-modified.png";
import { registerUser, loginUser } from "../api/loginPage";
import loginGif from "../assets/Gif/login.gif";
import registerGif from "../assets/Gif/register.gif";
import failedGif from "../assets/Gif/failed.gif";
import GifModal from "../Tools/GifModal";

const Login = () => {
  const nav = useNavigate();
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

    return () => {
      signUpBtn.removeEventListener("click", () => {});
      signInBtn.removeEventListener("click", () => {});
    };
  }, []);

  const [signUpUsername, setSignUpUsername] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalGif, setModalGif] = React.useState(null);
  const [modalMessage, setModalMessage] = React.useState("");

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="brand-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-img"
            onClick={() => nav("/main")}
          />
          <span className="brand-name" onClick={() => nav("/main")}>
            Miya Marines
          </span>
        </div>
      </div>
      <div className="wrapper">
        <img src={sleepingCat} alt="Sleeping Cat" id="sleeping-cat-gif" />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const result = await registerUser({
                    username: signUpUsername,
                    email: signUpEmail,
                    password: signUpPassword,
                  });
                  console.log("User created:", result.user);
                  setModalGif(registerGif);
                  // setModalMessage(
                  //   `Registration successful as ${result.user.username}!`,
                  // );
                  setModalVisible(true);
                  setTimeout(() => {
                    setModalVisible(false);
                    nav("/main");
                  }, 2000);
                } catch (err) {
                  setModalGif(failedGif);
                  setModalMessage(err.message);
                  setModalVisible(true);
                }
              }}
            >
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Username"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
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
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const result = await loginUser({
                    email: loginEmail,
                    password: loginPassword,
                  });
                  setModalGif(loginGif);
                  // setModalMessage(
                  //   `You have logged in as ${result.user.username}!`,
                  // );
                  setModalVisible(true);

                  setTimeout(() => {
                    setModalVisible(false);
                    nav("/main");
                  }, 2000);
                } catch (err) {
                  setModalGif(failedGif);
                  setModalMessage(err.message);
                  setModalVisible(true);
                }
              }}
            >
              <h1>Sign in</h1>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
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
      <GifModal
        show={modalVisible}
        gifSrc={modalGif}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Login;
