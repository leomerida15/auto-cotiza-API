const router = require('express').Router();
const upload = require('../configs/multer');

const { create, bring, destroy, edit, relations } = require('../controllers/products');

router.route('/products').get(bring);

router.route('/product').post(upload.single('files'), create);

router.route('/product/:id').delete(destroy).put(edit);

router.route('/relations').get(relations);

module.exports = router;
