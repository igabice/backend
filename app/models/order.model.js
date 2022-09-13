module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        item_id: String,
        item_name: String,
        cost: Number,
        total_cost: Number,
        quantity: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Order = mongoose.model("order", schema);
    return Order;
  };
  