import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with an API call to submit the form data
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">Contact Us</h2>
      <p className="text-lg mb-8 text-center text-gray-600">
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Write your message"
            rows="6"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
