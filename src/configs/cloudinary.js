const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dztorwkpa',
	api_key: '611833518384395',
	api_secret: 'BisYkqAi1eIlB7zeUlFeIAo-5hM',
});

module.exports = cloudinary.uploader;
