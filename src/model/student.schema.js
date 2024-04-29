import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  batch: {
    type: String,
    required: true,
  },
  studentDetails: {
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["placed", "not_placed"],
      required: true,
    },
  },
  courseScores: {
    DSAFinalScore: {
      type: Number,
    },
    WebDFinalScore: {
      type: Number,
    },
    ReactFinalScore: {
      type: Number,
    },
  },
  interviews: [
    {
      company: {
        type: String,
        require: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Company",
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  results: [
    {
      companyName: {
        type: String,
        require: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Company",
      },
      result: {
        type: String,
        enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
