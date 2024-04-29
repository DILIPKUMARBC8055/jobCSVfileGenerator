// Import mongoose for database schema creation
import mongoose from "mongoose";
// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Define schema for employee details
const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Middleware to hash the password before saving
employeeSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) {
    next();
  }
  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with stored password
employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create Employee model using the employeeSchema
const Employee = mongoose.model("Employee", employeeSchema);

// Export Employee model
export default Employee;
