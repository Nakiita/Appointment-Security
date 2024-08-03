import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookappointmentApi, getSingleDoctorApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isScanned, setIsScanned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const simulateScan = () => {
    setIsScanned(true);
  };

  const [userData, setUserData] = useState();
  const getUserDataFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        return null;
      }
      const parsedUserData = JSON.parse(userData);
      return parsedUserData;
    } catch (error) {
      console.error("Error retrieving user data from local storage:", error);
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    setUserData(userData);
  }, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    getSingleDoctorApi(id).then((res) => {
      const { doctor } = res.data;
      setFullName(doctor.fullName);
      setEmail(doctor.email);
      setPhoneNumber(doctor.phoneNumber);
      setQualification(doctor.qualification);
      setServicesOffered(doctor.servicesOffered);
      setOldImage(doctor.uploadValidIdUrl);
    });
  }, [id]);

  const data = {
    userId: userData,
    doctorId: id,
    date: date,
    time: time,
  };

  const verifyPayment = () => {
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookappointmentApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/success");
          window.location.reload();
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
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <img
              className="rounded-lg object-cover w-48 h-48"
              src={oldImage}
              alt={fullName}
            />
            <div className="text-black">
              <h3 className="text-2xl font-bold text-blue-600">{fullName}</h3>
              <h4 className="text-lg font-semibold text-green-600">{qualification}</h4>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> {email}<br />
                <strong>Phone Number:</strong> {phoneNumber}<br />
                <strong>Qualification:</strong> {qualification}<br />
                <strong>Services Offered:</strong> {servicesOffered}
              </p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faClose}
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate("/homepage")}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="bg-black text-white py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Book Appointment
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Book an appointment with {fullName}!</h1>
                <button
                  type="button"
                  className="text-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              <h2 className="text-lg font-semibold text-blue-500 mb-4">Doctor's Charge: Rs. 500</h2>
              <div className="flex justify-between mb-4">
                <div className="w-1/2 p-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    placeholder="Select date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="w-1/2 p-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time:
                  </label>
                  <input
                    type="time"
                    placeholder="Select time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="w-32 h-32 mb-4 mx-auto">
                  <img
                    src="/assets/images/khalti.png"
                    alt="QR Code"
                    onClick={simulateScan}
                    className="cursor-pointer"
                  />
                </div>
                <p>Scan to pay</p>
                <button
                  className="bg-black text-white py-2 px-4 rounded"
                  onClick={verifyPayment}
                  disabled={!isScanned}
                >
                  Verify Payment
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white py-2 px-4 rounded"
                  type="button"
                  disabled={!isVerified}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
