const CategoryModel = require("../models/category.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const newCategory = await CategoryModel.createCategory({
      name,
      userId,
    });
    res.created(newCategory, "Category is created");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getCategories = async (req, res) => {
    try {
      const categories = await CategoryModel.getAllCategory();
      res.success(categories, "Category Fetched Successfully.");
    } catch (err) {
      errorResponseHandler(err, req, res);
    }
  };
module.exports={
    createNewCategory,
    getCategories
}
