import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleDoctorApi, updateDoctorApi } from "../../apis/Api";
import { toast } from "react-toastify";

const AdminEditDoctor = () => {
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

  const [uploadValidId, setValidId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setValidId(file);
    setPreviewId(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", doctor.fullName);
    formData.append("email", doctor.email);
    formData.append("phoneNumber", doctor.phoneNumber);
    formData.append("gender", doctor.gender);
    formData.append("address", doctor.address);
    formData.append("city", doctor.city);
    formData.append("state", doctor.state);
    formData.append("qualification", doctor.qualification);
    formData.append("servicesOffered", doctor.servicesOffered);
    if (uploadValidId) formData.append("uploadValidId", uploadValidId);
    formData.append("user", user);

    updateDoctorApi(id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/admin");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal server error!");
      });
  };

  return (
    <section className="vh-100 flex items-center justify-center">
      <div className="container py-5">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-center text-2xl font-bold mb-4">
            Editing Details of Dr. {doctor.fullName}
          </h3>

          <div className="flex justify-center mb-4">
            <div className="rounded-full overflow-hidden h-48 w-48">
              <img
                src={doctor.oldImage}
                alt="Current doctor"
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  name="fullName"
                  value={doctor.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  name="email"
                  value={doctor.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={doctor.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                />
              </div>
              <div>
                <label className="block mb-1">Gender</label>
                <select
                  name="gender"
                  value={doctor.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <input
                  name="address"
                  value={doctor.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  name="city"
                  value={doctor.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1">State</label>
                <input
                  name="state"
                  value={doctor.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1">Qualification/Specialization</label>
                <input
                  name="qualification"
                  value={doctor.qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1">Services Offered</label>
                <textarea
                  name="servicesOffered"
                  value={doctor.servicesOffered}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded h-32"
                />
              </div>
              <div>
                <label className="block mb-1">Upload New Profile Picture</label>
                <input
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="file"
                />
              </div>
              {previewId && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={previewId}
                    alt="Preview"
                    className="rounded-lg object-cover"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Doctor
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => navigate("/admin")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminEditDoctor;
