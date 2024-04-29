import { Router } from "express";
import EmployeeController from "../controller/employee.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const employeeRouter = Router();
const employee = new EmployeeController();
employeeRouter.get("/", employee.home);
employeeRouter.get("/signup", employee.signUp);
employeeRouter.post("/signup", employee.postSignUp);
employeeRouter.get("/login", employee.login);
employeeRouter.post("/login", employee.postLogin);
employeeRouter.get("/students/:id",employee.getStudentById);
employeeRouter.get("/student", jwtAuth, employee.studentform);
employeeRouter.post("/students", jwtAuth, employee.postStudentform);
employeeRouter.get("/companylist", jwtAuth, employee.companyList);
employeeRouter.get("/addcompany", jwtAuth, employee.getAddCompany);

employeeRouter.post("/addcompany", jwtAuth, employee.addcompany);

employeeRouter.get("/emphome", jwtAuth, employee.empHomepage);

employeeRouter.get("/logout", jwtAuth, employee.logout);
employeeRouter.get("/studentlist", jwtAuth, employee.studentList);
employeeRouter.get("/downloadcsv", jwtAuth, employee.downloadCSV);



export default employeeRouter;
