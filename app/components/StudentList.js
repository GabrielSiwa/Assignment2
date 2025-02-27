"use client";
import { useEffect, useState } from "react";

function StudentList({ onSelect }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Student List</h2>
      <ul className="mt-2 space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => onSelect(student)}
          >
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;