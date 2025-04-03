import React from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa'; // Import FontAwesome icons

const About = () => {
  return (
    <div className="container mx-auto p-8">
      {/* About Section Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">About Us</h1>

      {/* About Content */}
      <div className="flex flex-col lg:flex-row gap-16 mb-16">
        <div className="lg:w-1/2">
          <img 
            src="./public/images/about.jpg" 
            alt="E-commerce Store"
            className="w-full h-auto rounded-lg shadow-xl object-cover" 
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to our e-commerce store! We are dedicated to providing you with the best online shopping experience. 
            Our mission is to offer a wide variety of products that cater to all your needs at competitive prices.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are committed to customer satisfaction and fast delivery, ensuring you get your products on time. 
            Whether you're looking for the latest trends or everyday essentials, we have something for everyone.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for shopping with us. We look forward to serving you again in the future!
          </p>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="bg-gray-50 p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-5xl text-gray-600 mr-4" />
              <div>
                <p className="text-xl font-semibold text-gray-900">Sarah J.</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-xs" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 italic">"The best shopping experience I've ever had! Fast shipping and great customer service!"</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-5xl text-gray-600 mr-4" />
              <div>
                <p className="text-xl font-semibold text-gray-900">John D.</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-xs" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 italic">"Amazing products! I love the variety, and the prices are unbeatable."</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-5xl text-gray-600 mr-4" />
              <div>
                <p className="text-xl font-semibold text-gray-900">Emily R.</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-xs" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 italic">"I found everything I needed in one place. Highly recommend this store!"</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-700 mx-auto w-full md:w-3/4">
          At our core, we are passionate about bringing you the best products at the best prices. We believe in quality,
          affordability, and excellent customer service. We strive to make your shopping experience as easy and enjoyable as possible.
        </p>
      </div>
    </div>
  );
}

export default About;
