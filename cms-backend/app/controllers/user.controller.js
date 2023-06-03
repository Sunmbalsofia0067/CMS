const db = require("../models");
const jwt = require('jsonwebtoken');
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
  const { name, age, email, password } = req.body;

  if (!name || !age || !email || !password || !password.length > 5) {
    return res.status(400).send({
      message: "Missing fields or password length is less than 5",
    });
  }

  const existingUser = await User.findOne({ where: { email } });

  console.log(existingUser);

  if (existingUser) {
    return res.status(400).send({
      message: "This email is already in use",
    });
  }

  // Create a User
  const user = {
    name,
    age,
    email,
    password,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const { password: passwordToRemoveFromRes, ...remainingData } = user;

    const token = jwt.sign({ userId: remainingData.dataValues.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.send({ user: remainingData.dataValues, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
    });
  }
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles.",
      });
    });
};
