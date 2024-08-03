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
