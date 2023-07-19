const mySqlConnection = require("../config/mysqlconnect");

class EmployeeController {
  // get all employee
  static getEmployees = (req, res) => {
    mySqlConnection.query("SELECT * FROM EMPLOYEE", (err, rows, field) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  };

  // get an employee by empId
  static getEmployee = (req, res) => {
    mySqlConnection.query(
      "SELECT * FROM EMPLOYEE WHERE Emp_Id = ?",
      [req.params.id],
      (err, rows, field) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  };

  // delete an employee
  static deleteEmployee = (req, res) => {
    mySqlConnection.query(
      "DELETE FROM EMPLOYEE WHERE Emp_Id = ?",
      [req.params.id],
      (err, rows, field) => {
        if (!err) {
          res.status(201).send({
            status: "success",
            message: "Employee deleted successfully!",
          });
        } else {
          res.status(500).send({
            status: "error",
            message: "An error occurred while deleting the employee.",
          });
          console.log(err);
        }
      }
    );
  };

  // add an employee
  static addEmployee = (req, res) => {
    let newEmployee = req.body;
    mySqlConnection.query(
      "INSERT INTO EMPLOYEE SET ?",
      newEmployee,
      (err, rows, field) => {
        if (!err) {
          res.status(201).send({
            status: "success",
            message: "Employee Added successfully!",
          });
        } else {
          res.status(500).send({
            status: "error",
            message: "An error occurred while Adding the employee.",
          });
          console.log(err);
        }
      }
    );
  };

  // edit an employee
  static editEmployee = (req, res) => {
    let empId = req.params.id;
    let employee = req.body;
    if (!employee.Emp_Name && !employee.Emp_Code && !employee.Emp_Salary) {
      return res.status(400).send({
        error: employee,
        message: "Please provide employee details",
      });
    }
    mySqlConnection.query(
      "UPDATE EMPLOYEE SET Emp_Name = ?, Emp_Code = ?, Emp_Salary = ? WHERE Emp_Id = ?",
      [employee.Emp_Name, employee.Emp_Code, employee.Emp_Salary, empId],
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          message: "Employee has been updated successfully.",
        });
      }
    );
  };
}

module.exports = EmployeeController;
