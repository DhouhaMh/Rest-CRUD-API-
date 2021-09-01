module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    lastName: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    profileImage: {
      type: Sequelize.STRING,
    },
    CV: {
      type: Sequelize.STRING,
    },
    hiredAt: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
