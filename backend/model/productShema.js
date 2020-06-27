const { model, Schema } = require('mongoose');

const ProductSchema = new Schema(
  {
    productName: {
      type: String
    },
    productBrand: {
      type: String
    },
    productRating: {
      type: String
    },
    productDiscount: {
      type: Number
    },
    productOriginalPrice: {
      type: Number
    },
    productImage: {
      type: String
    },
    productColor: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('productSchema', ProductSchema);
