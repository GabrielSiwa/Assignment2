"use client";

function StudentDetails({ student }) {
  if (!student) return <p className="text-gray-500">Select a student to view details.</p>;

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white space-y-4">
  <h2 className="text-2xl font-bold text-gray-800">{student.firstName} {student.lastName}</h2>
  
  <div className="text-lg text-gray-700 space-y-2">
    <p><strong className="text-gray-900">Date of Birth:</strong> {student.dateOfBirth}</p>
    <p><strong className="text-gray-900">Grade:</strong> {student.currentGrade}</p>
  </div>
</div>
  );
}

export default StudentDetails;