const { Router } = require('express');
const controller = require('./userController');

const router = new Router();

router.route('/:id')
    .get(controller.getUserByID);

router.route('/')
    .post(controller.createUser);

router.route('/:id')
    .put(controller.updateUser);

router.route('/:id')
    .delete(controller.deleteUser);

module.exports = router;