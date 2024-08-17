import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = location.state?.email;  // Retrieve email from navigation state

        fetch("http://localhost:5000/api/user/verify-otp", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData) => {
                if (responseData.success) {
                    toast.success("OTP verification successful!");
                    navigate("/login");  // Navigate after successful verification
                } else {
                    toast.error(responseData.message || "OTP verification failed.");
                }
            })
            .catch((error) => {
                toast.error("Error during OTP verification: " + error.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <FaArrowLeft className="h-6 w-6" />
                    </button>
                    <h1 className="text-2xl font-bold ml-4">Verify OTP</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full py-2 px-4 bg-black text-white font-medium rounded-md"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
