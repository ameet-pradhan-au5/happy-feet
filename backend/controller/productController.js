const ProductSchema = require('../model/productShema');

const getAllProducts = async (req, res) => {
  try {
    const response = await ProductSchema.find();
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

const AddProduct = async (req, res) => {
  try {
    const {
      productName,
      productBrand,
      productRating,
      productDiscount,
      productOriginalPrice,
      productImage,
      productColor
    } = req.body;
    const newProduct = new ProductSchema({
      productName,
      productBrand,
      productRating,
      productDiscount,
      productOriginalPrice,
      productImage,
      productColor
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllProducts, AddProduct };
