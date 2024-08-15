import React, { useState, useEffect } from "react";
import { checkSessionApi, getAllDoctorsApi } from "../../apis/Api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const checkSession = async () => {
    try {
      const response = await checkSessionApi();
      console.log(response);
      if (response.data.success === false) {
        // Handle session expiration
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear the token from local storage
        localStorage.removeItem('user'); // Clear user data from local storage
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Session check failed', error);
      // Optionally handle other errors (e.g., network issues)
    }
  };

  useEffect(
    () => {

      checkSession();
      const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
      return () => clearInterval(intervalId);
    }, []); // Dependency array includes navigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success('You have been logged out.');
  };
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
    <div className="container mx-auto">
      <div className="flex flex-wrap">
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
        <h3 className="text-center w-full text-xl font-semibold mb-6 mt-20">FIND YOUR DOCTOR</h3>
        <div className="flex flex-wrap justify-center w-full">
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-3">
              {filteredDoctors.map((person, index) => (
                <div className="p-3 w-full sm:w-1/2 md:w-1/4" key={index}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={person.uploadValidIdUrl}
                      height={300}
                      width={300}
                      alt={person.fullName}
                      className="h-72 w-full object-cover"
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold">{person.fullName}</h5>
                      <p className="text-sm text-gray-600">
                        {person.qualification}<br />
                        {person.servicesOffered}
                      </p>
                      <Link
                        to={`/details/${person._id}`}
                        className="block mt-3 bg-black text-white text-center py-2 px-4 rounded"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
