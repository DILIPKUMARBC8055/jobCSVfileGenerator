CSV file Generator
Description
This project is a web application developed using Node.js and Express.js for managing employees and students. It provides functionalities like employee authentication, student management, company management, and CSV file download of student data.

Installation
To run this project locally, follow these steps:

Clone the repository to your local machine:
bash
Copy code
git clone

Navigate to the project directory:
bash
Copy code
cd

Install dependencies using npm :
bash
Copy code
npm install

Create a .env file in the root directory and add the required environment variables. Example:
plaintext
Copy code
PORT=3000
MONGODB_URI=<mongodb-uri>
JWT_SECRET=<jwt-secret-key>

Start the server:
npm start

Access the application in your web browser at http://localhost:3000.

Usage

Employee Authentication: Employees can sign up and log in to the system using their email and password. JWT tokens are used for authentication.

Employee Dashboard: Upon successful login, employees are redirected to their dashboard where they can view their details and perform various actions.

Student Management: Employees can view, add, and edit student details. They can also view a list of students, search for students by ID, and download student data as a CSV file.

Company Management: Employees can view a list of companies, add new companies, and view details of individual companies.

Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Tokens)
EJS (Embedded JavaScript)
bcrypt
csv-writer
Other npm packages (body-parser, cookie-parser, etc.)

Folder Structure

src/: Contains the source code of the project.
config/: Configuration files (e.g., database connection).
errorHandling/: Custom error handling code.
middleware/: Custom middleware functions.
model/: Mongoose model schemas.
route/: Express.js route definitions.
view/: EJS view templates.
.gitignore: Specifies intentionally untracked files to ignore.
.env.example: Example environment variables file.
package.json: Project manifest file containing project metadata and dependencies.
server.js: Entry point of the application.

Contributors
DILIP KUMAR B C
