const { Router } = require('express');
const controller = require('./publicationController');

const router = new Router();

router.route('/')
    .get(controller.getPublications);

router.route('/:id')
    .get(controller.getPublicationByID);

router.route('/')
    .post(controller.createPublication);

router.route('/:id')
    .delete(controller.deletePublication);

module.exports = router;