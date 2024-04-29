// Import necessary modules and dependencies
import ApplicationError from "../../errorHandling/customError.error.js";
import path from "path";
import Employee from "../model/employee.schema.js";
import jwt from "jsonwebtoken";
import Student from "../model/student.schema.js";
import Company from "../model/company.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import writeStudentsToCSV from "../middleware/csvfile.middleware.js";

// Define the EmployeeController class
export default class EmployeeController {
  // Render home page
  home(req, res) {
    try {
      res.status(200).render("home", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render login page
  login(req, res) {
    try {
      res.status(200).render("login", { email: req.email, errors: null });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render employee homepage
  empHomepage(req, res) {
    try {
      res.status(200).render("empHome", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render sign up page
  signUp(req, res) {
    try {
      res.status(200).render("signup", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Fetch student by ID and render their details
  async getStudentById(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid student ID");
      }
      const student = await Student.findById(id);
      res
        .status(200)
        .render("singleStudent", { email: req.email, student: student });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render student form with company options
  async studentform(req, res) {
    try {
      const company = await Company.find();
      res.status(200).render("studentform", {
        email: req.email,
        error: null,
        companies: company,
      });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render list of companies
  async companyList(req, res) {
    try {
      const company = await Company.find();
      res
        .status(200)
        .render("listCompany", { email: req.email, companies: company });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render page to add a new company
  getAddCompany(req, res) {
    try {
      res.status(200).render("addCompany", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Add a new company to the database
  async addcompany(req, res) {
    try {
      const { name, industry } = req.body;
      const company = new Company({ name: name, industry: industry });
      await company.save();
      return res.redirect("/companylist");
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Logout and redirect to home page
  logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).redirect("/");
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Render list of students
  async studentList(req, res) {
    try {
      const students = await Student.find();
      res
        .status(200)
        .render("studentlist", { email: req.email, students: students });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Process sign up form and create new employee
  async postSignUp(req, res) {
    try {
      const { username, password, email, confirmPassword } = req.body;
      const employee = new Employee({
        username: username,
        email: email,
        password: password,
      });
      await employee.save();
      return res.render("login", { email: req.email, errors: null });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Process login form and authenticate employee
  async postLogin(req, res) {
    try {
      const { password, email } = req.body;
      const employee = await Employee.findOne({ email: email });
      if (!employee) {
        return res.render("login", {
          email: req.email,
          errors: "email not found",
        });
      }
      const result = await employee.matchPassword(password);
      if (result) {
        const token = jwt.sign(
          { email: employee.email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.cookie("token", token);
        res.redirect("/emphome");
      } else {
        return res.render("login", {
          email: req.email,
          errors: "Invalid credentials",
        });
      }
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  // Process student form and create new student
  async postStudentform(req, res) {
    try {
      const {
        name,
        email,
        batch,
        college,
        status,
        DSAFinalScore,
        WebDFinalScore,
        ReactFinalScore,
        attendedInterview,
        company,
        result,
        scheduleInterview,
        interviewCompany,
        interviewDate,
      } = req.body;
      let results = [];
      let interviews;
      if (attendedInterview == "on") {
        for (let index = 0; index < company.length; index++) {
          results.push({ companyName: company[index], result: result[index] });
        }
      }
      if (scheduleInterview == "on") {
        interviews = {
          company: interviewCompany,
          date: new Date(interviewDate),
        };
      }
      const newStudent = new Student({
        name,
        email,
        batch,
        studentDetails: { college, status },
        courseScores: { DSAFinalScore, WebDFinalScore, ReactFinalScore },
        interviews,
        results,
      });
      await newStudent.save();
      return res.redirect("/studentlist");
    } catch (err) {
      console.log(err);
      return res.status(200).render("studentform", {
        email: req.email,
        error: err.message,
        companies: company,
      });
    }
  }

  // Download CSV file containing student data
  async downloadCSV(req, res) {
    try {
      const students = await Student.aggregate([
        { $unwind: "$results" },
        { $unwind: "$interviews" },
      ]);
      const result = await writeStudentsToCSV(students);
      const paths = path.join(path.resolve(), "students.csv");
      const file = "students.csv";
      res.attachment(file);
      res.sendFile(paths);
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
}
