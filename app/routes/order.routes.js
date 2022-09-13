const orders = require("../controllers/order.controller.js");

const router = require("express").Router();

// Create a new Order
router.post("/", orders.create);

// Retrieve all Items
router.get("/", orders.findAll);

// Retrieve a single Order with id
router.get("/users/:user_id", orders.findAllByUserId);

// Retrieve a single Order with id
router.get("/:id", orders.findOne);

// Delete a Order with id
router.delete("/:id", orders.delete);

export default router;