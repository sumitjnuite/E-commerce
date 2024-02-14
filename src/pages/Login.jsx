import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../Redux/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "kminchelle",
          password: "0lelplR",
          // expiresInMins: 60, // optional
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        setErrorMsg(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      localStorage.setItem("dummy_token", data.token);
      navigate("/home");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="loginPagecont">
      <form onSubmit={handleSubmit} className="loginform">
        <h1>Login Form</h1>
        <input type="text" id="username" placeholder="Enter username" />
        <input type="password" id="password" placeholder="Enter password" />
        <button>LOGIN</button>
      </form>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default Login;
