const router = require('express').Router();
const upload = require('../configs/multer');

const { create, bring, destroy, edit } = require('../controllers/sections');

router.route('/sections').get(bring);

router.route('/section').post(create).put();

router.route('/section/:id').delete(destroy).put(edit);

module.exports = router;
