const router = require('express').Router();
const upload = require('../configs/multer');

const { create, bring, destroy, edit } = require('../controllers/products');

router.route('/products').get(bring);

router.route('/product/:id').post(upload.single('files'), create).delete(destroy).put(edit);

router.route('/product').post(upload.single('files'), create);

module.exports = router;
