import { parse } from "json2csv";
import fs from "fs";
import path from "path";

const generateCSV = (data) => {
  // Define columns for the CSV file
  const fields = [
    { label: "Student id", value: "_id.$oid" },
    { label: "Student name", value: "name" },
    { label: "Student college", value: "studentDetails.college" },
    { label: "Student status", value: "studentDetails.status" },
    { label: "DSA Final Score", value: "courseScores.DSAFinalScore" },
    { label: "WebD Final Score", value: "courseScores.WebDFinalScore" },
    { label: "React Final Score", value: "courseScores.ReactFinalScore" },
    { label: "Interview date", value: "interviews[0].date.$date" },
    { label: "Interview company", value: "interviews[0].company" },
    { label: "Interview student result", value: "results[0].result" },
  ];

  // Convert data to CSV format
  const csv = parse(data, { fields });

  // Write CSV string to file
  fs.writeFileSync(path.join(path.resolve(), "students.csv"), csv);

  console.log("CSV file written successfully");
};

export default generateCSV;
