const db = require("../models");
const Order = db.orders;

const items = require("../controllers/item.controller.js");

// Create and Save a new Order
exports.create = (req, res) => {

    const item_id = req.body.item_id;
  // Validate request
  if (!req.body.item_id) {
    res.status(400).send({ message: "item can not be empty!" });
    return;
  }

  Item.findById(item_id)
    .then((data) => {
        const updateQuantity = data.quantity - req.body.quantity;
        Item.findByIdAndUpdate(data.id, { quantity: updateQuantity }, { useFindAndModify: false });

        const order = new Order({
          item_id: req.body.item_id,
            item_name: data.title,
            cost: req.body.cost,
            total_cost: req.body.total_cost,
            quantity: req.body.quantity,
          });
        
          // Save Order in the database
          order
            .save(order)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
              });
            });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });

  // Create a Order
  
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const user_id = req.query.user_id;

  Order.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Retrieve all Orders by user_id from the database.
exports.findAllByUserId = (req, res) => {
  const user_id = req.query.user_id;

  Order.find({ user_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Order with id=" + id });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      } else {
        res.send({
          message: "Order was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Orders were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};

// Find all price Orders
exports.findAllPublished = (req, res) => {
  Order.find({ price: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};
