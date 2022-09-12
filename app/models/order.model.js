module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        item_id: String,
        user_id: String,
        cost: Number,
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
  