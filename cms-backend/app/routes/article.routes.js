const authorize = require("../middlewares/auth.js");

module.exports = (app) => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();


  // ========================== Protected Routes ==================================================
  // Create a new Article
  router.post("/", authorize, articles.create);

  // Retrieve all logged in user Articles
  router.get("/my-articles", authorize, articles.findAll);

    // Update a new Article
    router.post("/:id", authorize, articles.update);

  // Delete logged in user Article
  router.delete("/:id", authorize, articles.delete);
  
// ========================== Protected Routes End ==================================================



  // Retrieve all Articles
  router.get("/", articles.findAll);

  // Retrieve all published Articles
  router.get("/published", articles.findAllPublished);

  // Retrieve a single Article with id
  router.get("/:id", articles.findOne);

  // Update a Article with id
  router.put("/:id", articles.update);

  // Delete a Article with id
  router.delete("/:id", articles.delete);

  // Delete all Articles
  router.delete("/", articles.deleteAll);

  app.use("/api/articles", router);
};
