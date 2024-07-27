import React, { useEffect, useState } from "react";
import { getAllDoctorsApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";

const EmergencyContacts = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllDoctorsApi().then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  const filteredDoctors = doctors.filter((person) =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-full md:w-5/6">
        <div className="flex flex-col items-center">
          <h3 className="mt-24 text-xl font-semibold">Doctors</h3>
          <p className="mb-6 text-gray-600">Contacts of Doctors.</p>
          <div className="flex justify-center mb-6 w-full max-w-xl">
            <div className="flex items-center w-full bg-gray-200 rounded">
              <span className="px-3 py-2">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border-black rounded-r"
              />
            </div>
          </div>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg ml-[12rem]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">SN</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">Dr. {doctor.fullName}</td>
                  <td className="py-2 px-4 border-b">{doctor.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
