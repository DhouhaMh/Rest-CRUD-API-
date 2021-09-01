module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");
  const upload = require("../../middleware/upload.js");
  const uploadFile = require("../../middleware/uploadFile.js");

  var router = require("express").Router();
  // Create a new employee
  router.post(
    "/:companyId",
    upload.single("profileImage"),
    // uploadFile.single("CV"),
    employees.create
  );

  // find all hiredAt Employees
  router.get("/allHiredAt", employees.findAllHiredAt);

  // Retrieve all employees
  router.get("/", employees.findAll);

  // Retrieve a single employee with employeeId
  router.get("/:id", employees.findOne);

  // Update a employee with employeeId
  router.put("/:id", upload.single("profileImage"), employees.update);

  // Delete a employee with employeeId
  router.delete("/:id", employees.delete);

  // Delete all employees
  router.delete("/", employees.deleteAll);

  app.use("/api/employees", router);
};
