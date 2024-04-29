// Import mongoose for database schema creation
import mongoose from "mongoose";

// Define schema for student details
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Student name is required
  email: { type: String, required: true }, // Student email is required
  batch: { type: String, required: true }, // Batch is required
  studentDetails: {
    college: { type: String, required: true }, // College is required
    status: {
      type: String,
      enum: ["placed", "not_placed"], // Status must be one of these values
      required: true,
    },
  },
  courseScores: {
    DSAFinalScore: { type: Number },
    WebDFinalScore: { type: Number },
    ReactFinalScore: { type: Number },
  },
  interviews: [
    {
      company: { type: String, required: true }, // Interview company is required
      date: { type: Date, required: true }, // Interview date is required
    },
  ],
  results: [
    {
      companyName: { type: String, required: true }, // Company name for result is required
      result: {
        type: String,
        enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"], // Result must be one of these values
        required: true,
      },
    },
  ],
});

// Create Student model using the studentSchema
const Student = mongoose.model("Student", studentSchema);

// Export Student model
export default Student;
