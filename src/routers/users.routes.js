const router = require('express').Router();
const upload = require('../configs/multer');

const { register, login, social } = require('../controllers/users');

router.route('/login').post(login);
router.route('/social').post(social);
router.route('/register').post(register);

module.exports = router;
