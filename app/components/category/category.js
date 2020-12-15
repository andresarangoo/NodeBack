const db = require('../../../config/sequelize');
let Category = require('../../../config/models/category');

Category = Category(db.sequelize, db.Sequelize);

const createCategory = async(body) => {
    const { categoryName, categoryPhoto, categoryEmoji } = body;
    const newCategory = await Category.create({
        category_name: categoryName,
        category_photo: categoryPhoto,
        category_emoji: categoryEmoji
    });

    const categoryFormatted = {
        categoryName: newCategory.category_name,
        categoryPhoto: newCategory.category_photo,
        categoryEmoji: newCategory.category_emoji
    };
    return categoryFormatted;
}

const getCategories = async() => {
    const categories = await Category.findAll();
    const categoriesFormatted = categories.map(category => {
        return {
            categoryID: category.category_id,
            categoryName: category.category_name,
            categoryPhoto: category.category_photo,
            categoryEmoji: category.category_emoji
        };
    });
    return categoriesFormatted;
}

const getCategoryByID = async(id) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    const categoryFormatted = {
        categoryName: category.category_name,
        categoryPhoto: category.category_photo,
        categoryEmoji: category.category_emoji
    };
    return categoryFormatted;
}

const updateCategory = async(category_id, body) => {
    const { categoryName, categoryPhoto, categoryEmoji } = body;
    const categoryData = {
        category_name: categoryName,
        category_photo: categoryPhoto,
        category_emoji: categoryEmoji
    };
    console.log(categoryData)
    const [updatedRow] = await Category.update({...categoryData }, { where: { category_id } });
    return updatedRow;
}

const deleteCategory = async(category_id) => {
    const deletedRow = await Category.destroy({ where: { category_id } });
    return deletedRow;
}

module.exports = {
    getCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory,
    createCategory
};