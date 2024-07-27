import React, { useState, useEffect } from "react";
import {
  createDoctorApi,
  getPaginationApi,
  deleteDoctorApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered doctors based on search query
  const filteredDoctors = doctors.filter((person) =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getPaginationApi(currentPage).then((res) => {
      setDoctors(res.data.doctors);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Add new doctor form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [qualification, setQualification] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [uploadValidId, setValidId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setValidId(file);
    setPreviewId(URL.createObjectURL(file));
  };

  // Email validation
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailValidationMessage("Invalid email format.");
    } else {
      setEmailValidationMessage("");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  // Phone number validation
  const [validationMessage, setValidationMessage] = useState("");
  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    if (!regex.test(number)) {
      setValidationMessage("Invalid phone number. Must be 10 digits.");
    } else {
      setValidationMessage("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const number = e.target.value;
    setPhoneNumber(number);
    validatePhoneNumber(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("qualification", qualification);
    formData.append("servicesOffered", servicesOffered);
    formData.append("uploadValidId", uploadValidId);

    createDoctorApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setIsModalOpen(false);
          getPaginationApi(currentPage).then((res) => {
            setDoctors(res.data.doctors);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete doctor's information?"
    );
    if (!confirm) return;

    deleteDoctorApi(id).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar className="w-1/4" />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Doctors</h3>
          <p className="text-gray-600">Manage the list of doctors.</p>
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
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded ml-6"
              onClick={() => setIsModalOpen(true)}
            >
              Add Doctor
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.qualification}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/view/${doctor._id}`} className="text-blue-600 hover:text-blue-800">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/admin/edit/${doctor._id}`} className="text-yellow-500 hover:text-yellow-700 ml-4">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      onClick={() => handleDelete(doctor._id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={email}
                onChange={handleEmailChange}
              />
              {emailValidationMessage && (
                <div className="text-red-500 mb-2">{emailValidationMessage}</div>
              )}
              <label className="block mb-2">Phone Number</label>
              <input
                type="number"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              {validationMessage && (
                <div className="text-red-500 mb-2">{validationMessage}</div>
              )}
              <label className="block mb-2">Gender</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <label className="block mb-2">Address</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="block mb-2">City</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label className="block mb-2">State</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select State</option>
                <option value="Province 1">Province 1</option>
                <option value="Province 2">Province 2</option>
                <option value="Bagmati Province">Bagmati Province</option>
                <option value="Gandaki Province">Gandaki Province</option>
                <option value="Lumbini Province">Lumbini Province</option>
                <option value="Karnali Province">Karnali Province</option>
                <option value="Sudurpashchim Province">Sudurpashchim Province</option>
              </select>
              <label className="block mb-2">Qualification/Specialization</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
              <label className="block mb-2">Services Offered</label>
              <textarea
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={servicesOffered}
                onChange={(e) => setServicesOffered(e.target.value)}
              ></textarea>
              <label className="block mb-2">Profile Picture</label>
              <input
                type="file"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={handleImageUpload}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;