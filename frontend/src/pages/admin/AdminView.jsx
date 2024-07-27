import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleDoctorApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    qualification: "",
    servicesOffered: "",
    oldImage: "",
  });

  useEffect(() => {
    getSingleDoctorApi(id).then((res) => {
      const { doctor } = res.data;
      setDoctor({
        fullName: doctor.fullName,
        email: doctor.email,
        phoneNumber: doctor.phoneNumber,
        gender: doctor.gender,
        address: doctor.address,
        city: doctor.city,
        state: doctor.state,
        qualification: doctor.qualification,
        servicesOffered: doctor.servicesOffered,
        oldImage: doctor.uploadValidIdUrl,
      });
    });
  }, [id]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-5">
              <div className="flex justify-center">
                <img
                  className="rounded-lg object-cover h-64 w-64"
                  src={doctor.oldImage}
                  alt={doctor.fullName}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-5">
              <div className="flex justify-end">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => navigate("/admin")}
                >
                  <FontAwesomeIcon icon={faClose} size="lg" />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {doctor.fullName}
                </h3>
                <h4 className="text-xl font-medium text-green-600">
                  {doctor.qualification}
                </h4>
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> {doctor.email}
                    <br />
                    <strong>Phone Number:</strong> {doctor.phoneNumber}
                    <br />
                    <strong>Gender:</strong> {doctor.gender}
                    <br />
                    <strong>Address:</strong> {doctor.address}
                    <br />
                    <strong>City:</strong> {doctor.city}
                    <br />
                    <strong>State:</strong> {doctor.state}
                    <br />
                    <strong>Specialization:</strong> {doctor.qualification}
                    <br />
                    <strong>Services Offered:</strong> {doctor.servicesOffered}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  onClick={() => navigate("/admin")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminView;
