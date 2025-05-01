import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3000/api/contact', formData);
      console.log("API Response:", res.data);
      alert(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending contact data:', error);
      alert("Something went wrong. Try again!");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">Contact Us</h2>
      <p className="text-lg mb-8 text-center text-gray-600">
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
            placeholder="Write your message"
            rows="6"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
