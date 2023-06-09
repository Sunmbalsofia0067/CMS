const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Article
  const article = {
    userId: req.userId,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Article in the database
  Article.create(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  const { userId } = req;
  console.log('67890-098789098767890');
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : {...(userId ? {userId}: {})};

  Article.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  console.log(id);

  Article.findByPk(id)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id
      });
    });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
  const { userId } = req;
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id, ...(userId ? {userId}: {}) }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
  const { userId } = req;
  const id = req.params.id;

  Article.destroy({
    where: { id: id, ...(userId ? {userId}: {}) }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    });
};

// find all published Article
exports.findAllPublished = (req, res) => {
  Article.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};
