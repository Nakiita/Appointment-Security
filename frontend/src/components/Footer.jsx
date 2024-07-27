import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    return(
                <>
        <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img
                src="../assets/images/logo.png"
                className="w-20"
                alt="Logo"
              />
            </a>
            <p className="mt-4">
              Health Care website is a vital online platform, offering
              medical information, appointment scheduling, to enhance
              health literacy, communication between patients and
              healthcare providers, and overall patient-centered wellness.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <div className="flex flex-col">
              <a href="/" className="mb-2 text-gray-400 hover:text-white">
                Home
              </a>
              <a href="#about" className="mb-2 text-gray-400 hover:text-white">
                About
              </a>
              <a href="#facility" className="mb-2 text-gray-400 hover:text-white">
                Facility
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <h3 className="text-xl font-bold mb-4">Share</h3>
            <div className="flex flex-col items-center">
              <a
                href="https://www.facebook.com"
                className="mb-2 text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
              <a
                href="https://www.instagram.com"
                className="mb-2 text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
              <a
                href="https://www.github.com/"
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-center text-gray-400 mt-8">
          Created by <span className="text-white">Health Care</span> | All Rights Reserved.
        </h1>
      </section>
        </>
    );

};
export default Footer;