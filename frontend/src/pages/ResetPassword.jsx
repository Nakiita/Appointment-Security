import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Link has been expired");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center py-5">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-lg overflow-hidden">
            <div className="md:w-1/2 p-6">
              <img
                src="https://i.pinimg.com/564x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                alt="login image"
                className="img-fluid"
                style={{ marginTop: "100px" }}
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-6">
              <form onSubmit={handleResetPassword}>
                <div className="mb-4 text-center">
                  <h3 className="text-2xl font-semibold mb-3">Reset Your Password</h3>
                  <p className="text-gray-600">
                    Please enter the new password. Remember you cannot enter your old password again.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">New Password</label>
                  <input
                    onChange={handleNewPassword}
                    value={newPassword}
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="btn w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    type="submit"
                  >
                    Reset
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>





  );
};

export default ResetPassword;
