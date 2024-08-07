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
    <div className="flex h-screen justify-center items-center overflow-hidden">
      <div className="flex bg-white text-black ml-10 rounded-lg">
        <img
          src="./assets/images/register.jpg"
          alt="login image"
          className="w-full object-cover mb-[5rem]"
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
