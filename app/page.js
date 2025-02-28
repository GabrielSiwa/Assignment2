"use client";

import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import StudentList from "./components/StudentList";

export default function Home() {
  // ✅ Add useState to manage the selected student
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="bg-[#f8f5f1] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row row-start-2 items-start w-full min-h-screen bg-[#f8f5f1] p-4 gap-4">
        {/* Student Form Section */}
        <div className="flex flex-col w-1/3">
          <h2
            className="text-center font-bold mb-6 text-[40px]"
            style={{
              fontFamily: "Helvetica, sans-serif",
              fontWeight: 900,
              lineHeight: "1em",
            }}
          >
            Add New Student
          </h2>
          <StudentForm />
        </div>

        {/* Student List & Details Section */}
        <div className="flex flex-col w-2/3 p-2 bg-[#f8f5f1] border border-gray-400 rounded-lg shadow-lg">
          <StudentList
            onSelect={setSelectedStudent}
            selectedStudent={selectedStudent}
          />

          <div
            className={`mt-4 p-4 ${
              selectedStudent ? "bg-[#f8f5f1]" : "bg-gray-100"
            }`}
          >
            <StudentDetails student={selectedStudent} />
          </div>
        </div>
      </main>
    </div>
  );
}
