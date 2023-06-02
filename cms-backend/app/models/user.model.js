module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.NUMBER
    },
    city: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }

  });

  return User;
};
