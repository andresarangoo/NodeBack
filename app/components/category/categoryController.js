const httpStatus = require('http-status');
const Category = require('./category');
const component = 'Category';


const getCategories = async(req, res) => {
    try {
        const categories = await Category.getCategories();
        return res
            .status(httpStatus.OK)
            .send(categories);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información' });
    }
}

const getCategoryByID = async(req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.getCategoryByID(id);
        if (category) {
            return res
                .status(httpStatus.OK)
                .send(category);
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createCategory = async(req, res) => {
    const { categoryName, categoryPhoto, categoryEmoji } = req.body;
    if (!categoryName || !categoryPhoto || !categoryEmoji) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incompletos' });
    }
    try {
        const category = await Category.createCategory(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(category);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear la categoria' });
    }
}

const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(id, body);
    try {
        const wasUpdated = await Category.updateCategory(id, body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó la categoria, la información es igual' });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const deleteCategory = async(req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Category.deleteCategory(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Categoria borrada correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'CAtegoria no encontrada' });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getCategories,
    getCategoryByID,
    updateCategory,
    createCategory,
    deleteCategory
};