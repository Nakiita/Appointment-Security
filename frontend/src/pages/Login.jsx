import React, { useState } from "react";
import { loginApi } from "../apis/Api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const MAX_ATTEMPTS = 3;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
    clearError("email");
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Define the Zod validation schema
  const schema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLocked) {
      toast.error("Account is locked due to multiple failed login attempts. Please try again later.");
      return;
    }

    const data = {
      email,
      password,
    };

    // Validate form data using Zod schema
    const result = schema.safeParse(data);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // API Call
    loginApi(data)
      .then((res) => {
        if (res.data.success === false) {
          setAttemptCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= MAX_ATTEMPTS) {
              setIsLocked(true);
              toast.error("Too many failed attempts. Account is now locked.");
            } else {
              toast.error("Invalid credentials.");
            }
            return newCount;
          });
        } else {
          toast.success(res.data.message);
          // Set token and user data in local storage
          localStorage.setItem("token", res.data.token);
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);
          navigate(res.data.userData.isAdmin ? "/admin" : "/homepage");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error!");
      });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="overflow-hidden flex bg-white text-black ml-10 rounded-lg">
        <img
          src="./assets/images/Login.jpg"
          alt="login image"
          className="w-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-2xl font-semibold mb-6 text-black text-center">
            Welcome Back !!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={changeEmail}
                value={email}
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onChange={changePassword}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-semibold flex justify-end"
            >
              Forgot password?
            </Link>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or continue with</p>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4"
                  id="google"
                >
                  <path
                    fill="#fbbb00"
                    d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                  ></path>
                  <path
                    fill="#518ef8"
                    d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                  ></path>
                  <path
                    fill="#28b446"
                    d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                  ></path>
                  <path
                    fill="#f14336"
                    d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                  ></path>
                </svg>
                Google
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Are you new? &nbsp;
              <Link to="/register" className="text-black hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
          <p className="text-[8px] mt-5 flex items-center justify-center">
            By clicking continue, you agree to our &nbsp;{" "}
            <b>Terms of Service</b>
            &nbsp; and &nbsp;
            <b>Privacy Policy</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
