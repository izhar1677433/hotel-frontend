import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 px-4 text-white w-full mt-24">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
          <p className="text-white">Email: royalheights@486gmail.com</p>
          <p className="text-white">Phone: 03181677433</p>
          <p className="text-white">
            Address: Capital of Pakistan Islamabad
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-white hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/rooms" className="text-white hover:text-white">
                Rooms
              </a>
            </li>
            <li>
              <a href="/booking" className="text-white hover:text-white">
                Book Now
              </a>
            </li>
            <li>
              <a href="/contact" className=" text-white hover:text-white">
                Restaurant
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-4 text-xl font-semibold ">Follow Us</h3>

          

          <div className="gap-5 flex  flex-col">
            <a href="">
              <Icon icon="uiw:facebook" width="20" height="20" />
            </a>
            <a href=""><Icon icon="skill-icons:instagram" width="26" height="26" /></a>
            <a href=""><Icon icon="bi:github" width="26" height="26" /></a>
            <a href=""><Icon icon="mdi:email" width="24" height="24" /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Newsletter</h3>
          <p className="mb-2 text-white">Subscribe for exclusive offers!</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-t-lg p-2 pb-2 text-gray-800 focus:outline-none"
          />
          <button className="mb-1 w-full rounded-b-lg bg-blue-600 py-2 text-white transition duration-200 hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
  <div className="mt-10 text-center text-white text-sm">
        <p>
          &copy; {new Date().getFullYear()} Hotel Booking System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
