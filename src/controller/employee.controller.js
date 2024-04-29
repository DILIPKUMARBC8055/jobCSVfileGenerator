import ApplicationError from "../../errorHandling/customError.error.js";
import path from "path";
import Employee from "../model/employee.schema.js";
import jwt from "jsonwebtoken";
import Student from "../model/student.schema.js";
import Company from "../model/company.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import writeStudentsToCSV from "../middleware/csvfile.middleware.js";
import CreateCSVFile from "../middleware/json2csv.middleware.js";
import generateCSV from "../middleware/json2csv.middleware.js";
export default class EmployeeController {
  home(req, res) {
    try {
      res.status(200).render("home", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  login(req, res) {
    try {
      res.status(200).render("login", { email: req.email, errors: null });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  empHomepage(req, res) {
    try {
      res.status(200).render("empHome", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  signUp(req, res) {
    try {
      res.status(200).render("signup", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  async getStudentById(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // Handle the case where the id is not valid, perhaps by sending an error response
        return res.status(400).send("Invalid student ID");
      }
      const student = await Student.findById(id);
      console.log(student);

      res
        .status(200)
        .render("singleStudent", { email: req.email, student: student });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  async studentform(req, res) {
    try {
      const company = await Company.find();

      res
        .status(200)
        .render("studentform", { email: req.email, companies: company });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
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
  getAddCompany(req, res) {
    try {
      res.status(200).render("addCompany", { email: req.email });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
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
  logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).redirect("/");
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
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
  async postSignUp(req, res) {
    try {
      const { username, password, email, confirmPassword } = req.body;

      const employee = new Employee({
        username: username,
        email: email,
        password: password,
      });
      await employee.save();
      console.log("user created");
      return res.render("login", { email: req.email, errors: null });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  async postLogin(req, res) {
    try {
      const { password, email } = req.body;
      const employee = await Employee.findOne({ email: email });
      if (!employee) {
        return res.render("login", {
          email: req.email,
          errors: "email not foud",
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
      }
      {
        return res.render("login", {
          email: req.email,
          errors: "Invalid credentails",
        });
      }
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }

  async postStudentform(req, res) {
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
    console.log(req.body);
    if (attendedInterview == "on") {
      for (let index = 0; index < company.length; index++) {
        results.push({
          companyName: company[index],
          result: result[index],
        });
      }
    }
    if (scheduleInterview == "on") {
      interviews = { company: interviewCompany, date: new Date(interviewDate) };
    }

    // Create a new student instance
    const newStudent = new Student({
      name,
      email,
      batch,
      studentDetails: {
        college,
        status,
      },
      courseScores: {
        DSAFinalScore,
        WebDFinalScore,
        ReactFinalScore,
      },
      interviews,
      results,
    });

    // Save the student to the database
    await newStudent.save();

    return res.redirect("/studentlist");
  }
  catch(error) {
    throw new ApplicationError(error, 500);
  }

  async downloadCSV(req, res) {
    try {
      const students = await Student.aggregate([
        { $unwind: "$results" },
        { $unwind: "$interviews" },
      ]);
      // const students = await Student.find();
      console.log(students);
      const result = await writeStudentsToCSV(students);
      // generateCSV(students);
      const paths = path.join(path.resolve(), "students.csv");
      const file = "students.csv";
      res.attachment(file);
      console.log("the file is downloaded");
      res.sendFile(paths);
      // res.redirect("/emphome");
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
}
