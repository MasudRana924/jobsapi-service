const Category= require("../schemas/categorySchema");
const createCategory = async (data) => {
  const newCategory= new Category(data);
  const createdCategory = await newCategory.save();
  return createdCategory;
};
// const findAccountByEmail = async (email) => {
//   const userAccount = await UserAccount.findOne({ email }).lean();
//   return userAccount;
// };

const getAllCategory = async () => {
    const categories = await Category.find().sort({createdAt:-1});
    return categories;
  };
module.exports = {
    createCategory,
    getAllCategory
};