import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookMedical,
  faHospital,
  faProcedures,
  faSmile,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <div className="flex-grow">
          {/* Home Section */}
          <section className="bg-400 py-10" id="home">
            <div className="container mx-auto flex flex-wrap items-center justify-center text-center md:text-left">
              <div className="w-full md:w-1/2 p-5" data-aos="zoom-in">
                <img
                  src="../assets/images/home-img.svg"
                  className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                  alt=""
                />
              </div>
              <div className="w-full md:w-1/2 p-5" data-aos="fade-left">
                <h1 className="text-3xl font-bold">
                  <span className="text-blue-700">Stay</span> safe,{" "}
                  <span className="text-blue-700">stay</span> healthy.
                </h1>
                <h3 className="text-xl my-4">Caring for you.</h3>
                <a href="/login" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-100 py-10" id="about">
            <div className="container mx-auto flex flex-wrap items-center justify-center">
              <div className="w-full md:w-1/2 p-5" data-aos="fade-right">
                <div className="card mb-4 p-5 bg-white shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    <FontAwesomeIcon icon={faUserDoctor} /> Doctor's Details
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque, quis.
                  </p>
                </div>

                <div className="card mb-4 p-5 bg-white shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    <FontAwesomeIcon icon={faProcedures} /> Emergency Rooms
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque, quis.
                  </p>
                </div>

                <div className="card p-5 bg-white shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    <FontAwesomeIcon icon={faBookMedical} /> Booking
                    Appointments
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque, quis.
                  </p>
                </div>
              </div>
              <div
                className="w-full md:w-1/2 p-5 hidden md:block"
                data-aos="fade-left"
              >
                <img
                  src="../assets/images/option.png"
                  className="w-full rounded-lg"
                  alt=""
                />
              </div>
            </div>
          </section>

          {/* Facility Section */}
          <section className="py-10 bg-white" id="facility">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold text-center mb-10">
                <span>'</span> Our Facilities <span>'</span>
              </h1>
              <div className="flex flex-wrap justify-center">
                {/* Image 1 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img1.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img1.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
                {/* Image 2 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img2.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img2.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
                {/* Image 3 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img3.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img3.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
                {/* Image 4 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img4.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img4.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
                {/* Image 5 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img5.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img5.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
                {/* Image 6 */}
                <div className="w-full sm:w-1/2 md:w-1/3 p-4" data-aos="zoom-in">
                  <a
                    href="../assets/facilities_images/img6.jpg"
                    className="block"
                    title="Our Clinic"
                  >
                    <img
                      src="../assets/facilities_images/img6.jpg"
                      className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Counter Section */}
          <section className="bg-gray-800 text-white py-10">
            <div className="container mx-auto">
              <div className="flex flex-wrap text-center">
                <div className="w-full md:w-1/4 p-5" data-aos="fade-up">
                  <FontAwesomeIcon icon={faHospital} className="text-5xl mb-2" />
                  <span className="text-3xl font-bold">120+</span>
                  <h3 className="text-xl">Hospitals</h3>
                </div>
                <div className="w-full md:w-1/4 p-5" data-aos="fade-up">
                  <FontAwesomeIcon icon={faUser} className="text-5xl mb-2" />
                  <span className="text-3xl font-bold">100+</span>
                  <h3 className="text-xl">Staffs</h3>
                </div>
                <div className="w-full md:w-1/4 p-5" data-aos="fade-up">
                  <FontAwesomeIcon icon={faSmile} className="text-5xl mb-2" />
                  <span className="text-3xl font-bold">1200+</span>
                  <h3 className="text-xl">Patients</h3>
                </div>
                <div className="w-full md:w-1/4 p-5" data-aos="fade-up">
                  <FontAwesomeIcon icon={faProcedures} className="text-5xl mb-2" />
                  <span className="text-3xl font-bold">130+</span>
                  <h3 className="text-xl">Bed Facilities</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-100 py-10" id="contact">
            <div className="container mx-auto">
              <div className="flex flex-wrap items-center justify-center min-h-screen">
                <div className="w-full md:w-1/2 p-5" data-aos="fade-right">
                  <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="text-2xl font-semibold">Get In Touch</h3>
                    <p className="mt-4">
                      Whether you’re interested in a live product demonstration
                      or just want to learn more about our products, don’t
                      hesitate to reach out. Our friendly and knowledgeable team
                      is always more than happy to lend a hand.
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold">Email:</h3>
                      <p>info@example.com</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Contact:</h3>
                      <p>+977 9876543231</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-5 hidden md:block" data-aos="fade-left">
                  <img
                    src="../assets/images/home.png"
                    className="w-full rounded-lg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <Footer />

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
