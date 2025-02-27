"use client";

function StudentDetails({ student }) {
  if (!student) return <p className="text-gray-500">Select a student to view details.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
      <p><strong>DOB:</strong> {student.dateOfBirth}</p>
      <p><strong>Grade:</strong> {student.currentGrade}</p>
    </div>
  );
}

export default StudentDetails;