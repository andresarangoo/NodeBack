const { Router } = require('express');
const controller = require('./categoryController');

const router = new Router();

router.route('/')
    .get(controller.getCategories);

router.route('/:id')
    .get(controller.getCategoryByID);

router.route('/')
    .post(controller.createCategory);

router.route('/:id')
    .put(controller.updateCategory);

router.route('/:id')
    .delete(controller.deleteCategory);

module.exports = router;