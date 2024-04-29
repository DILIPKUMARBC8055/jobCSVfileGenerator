import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { type: String, require: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
