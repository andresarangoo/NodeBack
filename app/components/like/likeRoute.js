const { Router } = require('express');
const controller = require('./likeController');

const router = new Router();

router.route('/')
    .get(controller.getLikes);

router.route('/')
    .post(controller.createLike);

router.route('/:id')
    .delete(controller.deleteLike);

module.exports = router;