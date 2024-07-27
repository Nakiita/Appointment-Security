import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const changeUserName = (e) => {
    setUserName(e.target.value);
    clearError("UserName");
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
    clearError("email");
  };
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    clearError("phoneNumber");
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };
  const changeconfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
    clearError("confirmPassword");
  };

  // Define the Zod validation schema
  const schema = z
    .object({
      UserName: z.string().min(1, { message: "Name is required" }),
      email: z.string().min(1, { message: "Email is required" }),
      phoneNumber: z.string().min(1, { message: "Phone number is required" }),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .superRefine((data, ctx) => {
      if (data.UserName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name is required",
          path: ["UserName"],
        });
      } else if (!/^[A-Za-z\s]+$/.test(data.UserName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name cannot contain special characters or numbers",
          path: ["UserName"],
        });
      }
      if (data.email.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required",
          path: ["email"],
        });
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
          path: ["email"],
        });
      }

      if (data.phoneNumber.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required",
          path: ["phoneNumber"],
        });
      } else if (!/^\d{10}$/.test(data.phoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number must be 10 digits",
          path: ["phoneNumber"],
        });
      }

      if (data.password.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
          path: ["password"],
        });
      } else if (data.password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long",
          path: ["password"],
        });
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
          data.password
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must include uppercase, lowercase, number, and special character",
          path: ["password"],
        });
      }

      if (data.confirmPassword.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm Password is required",
          path: ["confirmPassword"],
        });
      } else if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      UserName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };

    // Validate form data using Zod schema
    const result = schema.safeParse(data);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        console.log(err);
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    registerApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black rounded-lg">
        <img
          src="../assets/images/Login.jpg"
          alt="register image"
          className="w-full"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-xl font-semibold mb-6 text-black text-center">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={changeUserName}
                value={UserName}
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.UserName && (
                <p className="text-red-500 text-sm mt-1">{errors.UserName}</p>
              )}
            </div>
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
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                onChange={changePhoneNumber}
                value={phoneNumber}
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
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
      <p className="text-xs text-gray-500 mt-1">
        Must be at least 8 characters long and include uppercase, lowercase, number, and special character.
      </p>
    </div>

    <div>
      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <div className="relative">
        <input
          onChange={changeconfirmPassword}
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
        <button
          type="button"
          onClick={toggleShowConfirmPassword}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mt-1">
          {errors.confirmPassword}
        </p>
      )}
    </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Register
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
              Already have an account? &nbsp;
              <Link to="/login" className="text-black hover:underline">
                Login
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

export default Register;
