var express = require('express')
var router = express.Router()

// ---------------------------------------------------------------

// Import controllers
const productsController = require('../controllers/controllerProducts');
const categoriesController = require('../controllers/controllerCategories');
const usersController = require('../controllers/controllerUsers');

// -------------------------------------------------------------

// create a category
router.post("/categories", categoriesController.create);

// get all categories
router.get("/categories", categoriesController.findAll);

// find one categories
router.get("/categories/:id", categoriesController.findById);

// update a categories
router.put("/categories/:id", categoriesController.update);

// delete a categories
router.delete("/categories/:id", categoriesController.delete);

//---------------------------------------------------- 

// create a product
router.post("/product", productsController.create);

// get all product
router.get("/product", productsController.findAll);

// find one product
router.get("/product/:id", productsController.findById);

// update a product
router.put("/product/:id", productsController.update);

// delete a product
router.delete("/product/:id", productsController.delete);

// ------------------------------------------------------

// // create a user
router.post("/users", usersController.create);

// // get all users
router.get("/users", usersController.findAll);

// // find one user
router.get("/users/:id", usersController.findById);

// // update a user
router.put("/users/:id", usersController.update);

// // delete a user
router.delete("/users/:id", usersController.delete);

// ------------------------------------------------------

// export 
module.exports = router;