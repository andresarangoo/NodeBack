const { Router } = require('express');

const router = new Router();

//const router = new express.Router(); //también se puede usar

const publications = require('./publication/publicationRoute');
const categories = require('./category/categoryRoute');
const users = require('./user/userRoute');
const likes = require('./like/likeRoute');

router.use('/publications', publications);
router.use('/categories', categories);
router.use('/users', users);
router.use('/likes', likes);

module.exports = router;