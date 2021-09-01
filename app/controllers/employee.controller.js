const db = require("../models");
const Employee = db.employees;
const Company = db.companies;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body && !req.file) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let lastName = req.body.lastName;
  let firstName = req.body.firstName;
  let address = req.body.address;
  let email = req.body.email;
  let profileImage = req.file.filename;
  let CV = req.file;
  let companyId = req.params.companyId;
  let hiredAt = moment().lang("fr").format("L");

  // Create a Employee
  const employee = {
    lastName: lastName,
    firstName: firstName,
    address: address,
    email: email,
    profileImage: profileImage,
    companyId: companyId,
    // CV: CV,
    hiredAt: hiredAt,
  };

  // Save Employee in the database
  Employee.create(employee, companyId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee.",
      });
    });
};

//create employee belongs to company
exports.createEmployee = (companyId, employee) => {
  return Employee.create({
    lastName: employee.lastName,
    firstName: employee.firstName,
    address: employee.address,
    email: employee.email,
    profileImage: employee.profileImage,
    companyId: companyId,
  })
    .then((employee) => {
      console.log(">> Created employee: " + JSON.stringify(employee, null, 4));
      return employee;
    })
    .catch((err) => {
      console.log(">> Error while creating employee: ", err);
    });
};

exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName
    ? { firstName: { [Op.like]: `%${firstName}%` } }
    : null;

  Employee.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id,
      });
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    });
};

// find all hiredAt Employees
exports.findAllHiredAt = (req, res) => {
  // let hiredDate = req.params.hiredDate;
  let hiredDate = "01/09/2021";
  // console.log("hiredDate", hiredDate.split("/")[1]);
  Employee.findAll({ where: { hiredAt: hiredDate } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies.",
      });
    });
};
