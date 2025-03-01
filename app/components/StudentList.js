"use client";

import { useEffect, useState } from "react";

function StudentList({ onSelect }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5500/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleSelect = (student) => {
    setSelectedStudent(student.id);
    onSelect(student);
  };

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8">
      <div>
        <h2
          className="font-bold mb-4 text-[40px]"
          style={{
            fontFamily: "Helvetica, sans-serif",
            fontWeight: 900,
            lineHeight: "1em",
          }}
        >
          Students List
        </h2>
      </div>

      {/* Table Header */}
      <div className="flex font-bold text-lg border-b-2 border-gray-300 pb-2">
        <div className="w-1/6">ID</div>
        <div className="w-5/6">Name</div>
      </div>

      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className={`flex items-center p-2 text-lg cursor-pointer transition ${
              selectedStudent === student.id
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handleSelect(student)}
          >
            <div className="w-1/6">{student.id}</div>
            <div className="w-5/6">{student.firstName} {student.lastName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
