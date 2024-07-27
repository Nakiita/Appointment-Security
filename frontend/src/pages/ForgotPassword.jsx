import React, { useState } from "react";
import { forgotPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // You can redirect the user to another page if needed
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Forgot Password API Error:", error);
        throw error; // rethrow the error to maintain the error flow
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center py-5">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-lg overflow-hidden">
            <div className="md:w-1/2 p-6">
              <img
                src="https://i.pinimg.com/564x/0e/a5/4e/0ea54e5a470405dfdf3d98bf543460e5.jpg"
                alt="Reset password illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                  <h3 className="text-2xl font-semibold mb-3">Reset Your Password</h3>
                  <p className="text-gray-600">
                    Please enter the email address associated with your account, and we will email you a link to reset your password.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email address</label>
                  <input
                onChange={forgotPasswordEmail}
                value={setForgotPasswordEmail}
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="btn w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    type="button"
                  >
                    Send Request
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Back to{" "}
                    <a
                      href="/login"
                      className="text-blue-500 hover:underline"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
