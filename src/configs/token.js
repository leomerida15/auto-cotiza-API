const jwt = require('jsonwebtoken');
const key = '12345678';

const generate = async (id, correo) => jwt.sign({ id, correo }, key);

const valid = async (item) => jwt.verify(item, key);

module.exports = { generate, valid };
