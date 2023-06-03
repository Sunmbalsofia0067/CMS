module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    userId: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Article;
};
