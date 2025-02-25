"use client";
import { useState } from "react";

const StudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    currentGrade: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateDate = (dateString) => {
    const date = new Date(dateString);
    const minYear = 1900;
    const maxYear = new Date().getFullYear();

    if (isNaN(date.getTime())) {
      return "Invalid date format";
    }

    const year = date.getFullYear();
    if (year < minYear || year > maxYear) {
      return `Year must be between ${minYear} and ${maxYear}`;
    }

    return "";
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName.trim())
      tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      tempErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      tempErrors.dateOfBirth = "Date of birth is required";
    if (!formData.currentGrade.trim())
      tempErrors.currentGrade = "Grade is required";

    // if (formData.dateOfBirth && isNaN(Date.parse(formData.dateOfBirth))) {
    //   tempErrors.dateOfBirth = "Invalid date format";
    // }

    const dateError = validateDate(formData.dateOfBirth);
    if (dateError) tempErrors.dateOfBirth = dateError;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5500/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setMessage("Student added successfully");
          setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            currentGrade: "",
          });
        } else {
          setMessage("Failed to add student");
        }
      } catch (error) {
        setMessage("Failed to add student due to an error");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">First Name</label>
          <input
            type="text"
            name="firstName"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg text-gray-900"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {errors.firstName && (
            <p className="text-red-200 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-lg">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg text-gray-900"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {errors.lastName && (
            <p className="text-red-200 text-sm">{errors.lastName}</p>
          )}
        </div>
        <div>
          <label className="block text-lg">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg text-gray-900"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-200 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>
        <div>
          <label className="block text-lg">Grade</label>
          <input
            type="text"
            name="currentGrade"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg text-gray-900"
            value={formData.currentGrade}
            onChange={handleInputChange}
            required
          />
          {errors.currentGrade && (
            <p className="text-red-200 text-sm">{errors.currentGrade}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-950 text-white-600 font-semibold p-3 rounded-lg w-full hover:bg-gray-400"
          >
            Add Student
          </button>
        </div>
      </form>
      {message && (
        <div className="text-green-200 text-center mt-4">{message}</div>
      )}
    </div>
  );
};

export default StudentForm;
