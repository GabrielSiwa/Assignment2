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
    <div className="w-full max-w-lg mx-auto bg-[#283444] p-6 sm:p-8 md:p-10 shadow-lg text-white">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-lg sm:text-xl font-medium">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="mt-1 p-3 w-full border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {errors.firstName && (
            <p className="text-red-300 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-lg sm:text-xl font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="mt-1 p-3 w-full border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {errors.lastName && (
            <p className="text-red-300 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-lg sm:text-xl font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            className="mt-1 p-3 w-full border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-300 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Grade */}
        <div>
          <label className="block text-lg sm:text-xl font-medium">Grade</label>
          <input
            type="text"
            name="currentGrade"
            className="mt-1 p-3 w-full border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            value={formData.currentGrade}
            onChange={handleInputChange}
            required
          />
          {errors.currentGrade && (
            <p className="text-red-300 text-sm">{errors.currentGrade}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center sm:justify-end">
          <button
            type="submit"
            className="bg-[#ddccb8] text-[#283444] font-semibold px-5 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Add Student
          </button>
        </div>
      </form>

      {/* Success Message */}
      {message && (
        <div className="text-green-300 text-center mt-4">{message}</div>
      )}
    </div>
  );
};

export default StudentForm;
