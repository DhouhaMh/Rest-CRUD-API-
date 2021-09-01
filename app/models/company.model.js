module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.STRING,
    },
  });

  return Company;
};
