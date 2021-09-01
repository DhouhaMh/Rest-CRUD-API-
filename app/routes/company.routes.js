module.exports = (app) => {
  const companies = require("../controllers/company.controller.js");
  const upload = require("../../middleware/upload.js");
  const uploadFile = require("../../middleware/uploadFile.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /:
   *    post:
   *      description: Add company
   *    parameters:
   *
   *        description: no parameter
   *
   *        schema:
   *          type: string
   *          format: string
   *    responses:
   *      '201':
   *        description: Successfully created company
   * content:
   *    application/json:
   *          schema:
   *              type: string
   *                format: string
   */

  // Create a new company
  router.post(
    "/",
    upload.single("profileImage"),
    // uploadFile.single("CV"),
    companies.create
  );

  /**
   * @swagger
   * /:
   *  get:
   *    description: Use to request all companies
   *    responses:
   *      '200':
   *        description: A successful response
   */

  // Retrieve all companies
  router.get("/", companies.findAll);

  // Retrieve a single company with companyId
  router.get("/:id", companies.findOne);

  /**
   * @swagger
   * /employeesByCompany/1:
   *  get:
   *    description: Get compony with list of employees
   *    responses:
   *      '200':
   *        description: A successful response
   */

  //List of employees by company
  router.get("/employeesByCompany/:companyId", companies.findCompanyById);

  /**
   * @swagger
   * /:
   *  put:
   *    description: Get compony with list of employees
   *    responses:
   *      '200':
   *        description: A successful response
   */

  // Update a company with companyId
  router.put("/:id", upload.single("profileImage"), companies.update);

  /**
   * @swagger
   * /:
   *  delete:
   *    description: Get compony with list of employees
   *    responses:
   *      '200':
   *        description: A successful response
   */

  // Delete a company with companyId
  router.delete("/:id", companies.delete);

  // Delete a new companies
  router.delete("/", companies.deleteAll);

  app.use("/api/companies", router);
};
