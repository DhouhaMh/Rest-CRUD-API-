const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let name = req.body.name;
  let bio = req.body.bio;
  let website = req.body.website;

  // Create a Company
  const company = {
    name: name,
    bio: bio,
    website: website,
  };

  // Save Employee in the database
  Company.create(company)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company.",
      });
    });
};

//get employees for a given company
exports.findCompanyById = (req, res) => {
  let companyId = req.params.companyId;

  return Company.findByPk(companyId, {
    include: ["employees"],
  })
    .then((company) => {
      res.send(company);
    })
    .catch((err) => {
      console.log(">> Error while finding company: ", err);
    });
};

//get all companies
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Company.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Companies.",
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id,
      });
    });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Company with id=" + id,
      });
    });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id,
      });
    });
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Companies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companies.",
      });
    });
};
