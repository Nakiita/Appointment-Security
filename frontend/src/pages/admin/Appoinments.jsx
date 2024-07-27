import React, { useEffect, useState } from "react";
import {
  deleteAppointmentApi,
  getAllDoctorsApi,
  getAllUsersApi,
  getPaginationAppointmentApi,
} from "../../apis/Api";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPaginationAppointmentApi(currentPage).then((res) => {
      setAppointments(res.data.appointments);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  useEffect(() => {
    getAllDoctorsApi().then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  useEffect(() => {
    getAllUsersApi().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      searchQuery === "" ||
      users
        .find((user) => user._id === appointment.userId)
        ?.UserName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      doctors
        .find((doctor) => doctor._id === appointment.doctorId)
        ?.fullName.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointmentApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar className="w-1/4" />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Appointments</h3>
          <p className="text-gray-600">Manage the list of appointments.</p>
          <div className="flex justify-center mb-4">
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
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User's Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor's Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Time</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => (
                  <tr key={appointment._id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{users.find((user) => user._id === appointment.userId)?.UserName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {doctors.find((doctor) => doctor._id === appointment.doctorId)?.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(appointment._id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div className="mt-4">
          <nav aria-label="Page navigation">
            <ul className="flex justify-center">
              <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                <button
                  className="px-3 py-1 border rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous"
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button
                    className={`px-3 py-1 border ${currentPage === page ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
                <button
                  className="px-3 py-1 border rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
