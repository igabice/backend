module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      price: Number,
      color: String,
      stock: Number,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Item = mongoose.model("item", schema);
  return Item;
};
