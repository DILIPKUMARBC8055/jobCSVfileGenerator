// Import mongoose for database schema creation
import mongoose from "mongoose";

// Define schema for company details
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Company name is required
  },
  industry: {
    type: String, // Industry type is optional
  },
});

// Create Company model using the companySchema
const Company = mongoose.model("Company", companySchema);

// Export Company model
export default Company;
