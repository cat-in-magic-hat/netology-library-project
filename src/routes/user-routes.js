const { Router } = require('express');
const { HTTP_STATUS_CODES } = require('../constants');
const { User } = require('../models');

const userRoutes = new Router();

const responseStubCode = HTTP_STATUS_CODES.CREATED;
const responseStub = new User(1, 'test@mail.ru');

userRoutes.post(`/login`, (req, res) => {
    res.status(responseStubCode).json(responseStub);
});

module.exports = userRoutes;