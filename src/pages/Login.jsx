import React, { useRef, useState, useEffect } from "react";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const BASE_URL = import.meta.env.VITE_BASE_URL;

// Move LoginForm outside to prevent recreation on every render
const LoginForm = ({
  email,
  setEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  setIsLogin,
}) => {
  return (
    <div className="flex w-full  max-w-4xl flex-col items-center rounded-2xl bg-white shadow-2xl transition duration-1000 ease-out md:w-1/3">
      <h2 className="p-3 text-3xl font-bold text-pink-500">Royal Heights</h2>
      <div className="inline-block w-20 border-[1px] border-solid border-blue-500"></div>
      <h3 className="pt-2 text-xl font-semibold text-blue-500">LogIn!</h3>
      {/* Login Inputs */}
      <form
        onSubmit={handleLogin}
        autoSave="email"
        className="flex flex-col items-center justify-center bg-white"
      >
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="m-1 w-4/5 rounded-2xl border border-gray-600 px-2 py-1 focus:border-blue-600 focus:shadow-md focus:outline-none md:w-full"
          placeholder="Email"
        />
        <input
          type="password"
          value={loginPassword}
          name="loginPassword"
          onChange={(e) => setLoginPassword(e.target.value)}
          className="m-1 w-4/5 rounded-2xl border border-gray-600 px-2 py-1 focus:border-blue-600 focus:shadow-md focus:outline-none md:w-full"
          placeholder="Password"
        />
        <button
          type="submit"
          className="m-2 w-2/5 rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-white hover:text-blue-400"
        >
          Sign In
        </button>
      </form>

      <div className="inline-block w-20 border-[1px] border-solid border-blue-600"></div>
      <p className="mt-4 text-sm text-blue-600">Don't have an account?</p>
      <p
        className="mb-4 cursor-pointer text-sm font-medium text-blue-600"
        onClick={() => setIsLogin(false)}
      >
        Create a New Account?
      </p>
    </div>
  );
};

// Move SignUpForm outside to prevent recreation on every render
const SignUpForm = ({
  registerName,
  setRegisterName,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  handleregister,
  setIsLogin,
}) => {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center rounded-2xl bg-white text-black shadow-2xl transition duration-1000 ease-in md:w-1/3">
      <h2 className="p-3 text-3xl font-bold text-pink-600">Royal Heights</h2>
      <div className="inline-block w-20 border-[1px] border-solid border-black"></div>
      <h3 className="pt-2 text-xl font-semibold text-blue-600">
        Create Account!
      </h3>

      {/* Register Inputs */}
      <form
        onSubmit={handleregister}
        className="mt-2 flex flex-col items-center justify-center"
      >
        <input
          type="text"
          name="text"
          className="m-1 w-4/5 rounded-2xl border border-gray-600 px-2 py-1 focus:border-blue-600 focus:shadow-md focus:outline-none md:w-full"
          placeholder="Full Name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          className="m-1 w-4/5 rounded-2xl border border-gray-600 px-2 py-1 focus:border-blue-600 focus:shadow-md focus:outline-none md:w-full"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="m-1 w-4/5 rounded-2xl border border-gray-600 px-2 py-1 focus:border-blue-600 focus:shadow-md focus:outline-none md:w-full"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button
          type="submit"
          className="m-4 w-3/5 rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-500 hover:text-black"
        >
          Sign Up
        </button>
      </form>

      <div className="inline-block w-20 border-[1px] border-solid border-white"></div>
      <p className="mt-4 text-sm text-black">
        <a href="/pages/Login">Already have an account?</a>
      </p>
      <p
        className="mb-4 cursor-pointer text-sm font-medium text-black"
        onClick={() => setIsLogin(true)}
      >
        Sign In to your Account?
      </p>
    </div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Login States
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register States (not wired to API yet)
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        setIsLogin(true);
        // Clear form
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        alert(data.msg || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Login successful:", data);
        login(data.user, data.token);
        // alert("Login successful!");
        if (data.user.role === "admin") {
          console.log("navigate to admin")
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.msg || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:py-2">
      <main className="flex w-full items-center px-2 md:px-20">
        <div className="hidden flex-1 flex-col space-y-1 md:inline-flex">
          <p className="text-6xl font-bold text-pink-500">Royal Heights</p>
          <p className="text-lg font-medium text-gray-500">
            Explore your interests, meet new friends & expand your horizons
            <br /> Enjoy Your Vacations
          </p>
        </div>
        {isLogin ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            handleLogin={handleLogin}
            setIsLogin={setIsLogin}
          />
        ) : (
          <SignUpForm
            registerName={registerName}
            setRegisterName={setRegisterName}
            registerEmail={registerEmail}
            setRegisterEmail={setRegisterEmail}
            registerPassword={registerPassword}
            setRegisterPassword={setRegisterPassword}
            handleregister={handleregister}
            setIsLogin={setIsLogin}
          />
        )}
      </main>
    </div>
  );
};

export default Login;


