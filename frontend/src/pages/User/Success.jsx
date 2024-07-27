import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container py-5 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/564x/5f/50/ec/5f50ecb76a6772969556d16a62c1fe5e.jpg"
                alt="success image"
                className="rounded-full w-32 h-32 mb-4"
                style={{ marginTop: 20 }}
              />
              <h4 className="text-green-600 text-2xl font-semibold mb-2">Success</h4>
              <p className="text-lg font-bold mb-2">Appointment booking Successful!!</p>
              <p className="text-center text-gray-700 mb-4">
                <strong>Mark your calendar and see you soon!</strong>
              </p>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg"
                onClick={() => navigate("/")}
              >
                Go back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
