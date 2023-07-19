const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");

router.get("/employees", employeeController.getEmployees);

router.get("/employee/:id", employeeController.getEmployee);

router.delete("/employee/:id", employeeController.deleteEmployee);

router.post("/add-employee", employeeController.addEmployee);

router.put("/edit-employee/:id", employeeController.editEmployee);

module.exports = router;
