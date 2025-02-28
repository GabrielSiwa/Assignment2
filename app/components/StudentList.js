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
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="cursor-pointer text-black text-lg p-2 hover:bg-blue-500 hover:text-white transition"
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
