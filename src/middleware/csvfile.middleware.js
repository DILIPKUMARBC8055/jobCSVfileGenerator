import { createObjectCsvWriter } from "csv-writer";
import path from "path";

async function writeStudentsToCSV(students) {
  // Define the CSV file header
  const csvWriter = createObjectCsvWriter({
    path: path.join(path.resolve(), "students.csv"),
    header: [
      { id: "name", title: "Student Name" },
      { id: "email", title: "Student Email" },
      { id: "batch", title: "Batch" },
      { id: "college", title: "Student College" },
      { id: "status", title: "Student Status" },
      { id: "DSA", title: "DSA Final Score" },
      { id: "WebD", title: "WebD Final Score" },
      { id: "React", title: "React Final Score" },
      { id: "interviewCompany", title: "Next Interview Company" },
      { id: "interviewDate", title: "Next Interview Date" },
      { id: "interviewResultCompany", title: "Atteneded Company" },
      { id: "interviewResult", title: "Interview Result" },
    ],
  });

  // Map student data to CSV format
  const records = students.flatMap((student) => {
    return {
      name: student.name,
      email: student.email,
      batch: student.batch,
      college: student.studentDetails.college,
      status: student.studentDetails.status,
      DSA: student.courseScores.DSAFinalScore,
      WebD: student.courseScores.WebDFinalScore,
      React: student.courseScores.ReactFinalScore,
      interviewDate: student.interviews.date.toISOString().split("T")[0],
      interviewCompany: student.interviews.company,
      interviewResultCompany: student.results.companyName,
      interviewResult: student.results.result,
    };
  });

  // Write records to CSV file
  await csvWriter.writeRecords(records);
  console.log("CSV file has been written successfully.");
}

export default writeStudentsToCSV;
