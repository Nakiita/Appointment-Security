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
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex">
      <div className="w-full md:w-5/6">
        <div className="flex flex-col ml-[12rem]">
          <h3 className="text-xl font-semibold">Doctors</h3>
          <p className="mb-6 text-gray-600">Contacts of Doctors.</p>
          <div className="flex justify-center w-full">
            <div className="flex items-center border rounded w-full max-w-md">
              <span className="px-3 text-gray-500">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Search by Name"
                onChange={handleSearchChange}
                className="flex-1 p-2 outline-none"
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
                  <td className="py-2 px-4 border-b">{doctor.fullName}</td>
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
