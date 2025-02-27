"use client";

import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import StudentList from "./components/StudentList";

export default function Home() {
  // ✅ Add useState to manage the selected student
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>The student data DOB is Month Day Year - MM/DD/YYYY</p>
        <StudentForm />
        <StudentList onSelect={setSelectedStudent} />
        <StudentDetails student={selectedStudent} />
      </main>
    </div>
  );
}