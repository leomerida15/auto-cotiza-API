const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: path.resolve('src/uploads'),
	filename: (req, file, cb) => cb(null, file.originalname.replace(/ /gi, '_')),
});

const upload = multer({ storage });

module.exports = upload;
