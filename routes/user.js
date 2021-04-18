const UserController = require('../controllers/user');
const express = require('express');
const app = express();
app.use(express.json());
const { body, validationResult } = require('express-validator');

app.post(
  '/user',
  body('email').isEmail(),
  // password must be at least 8 chars long
  body('password').isLength({ min: 8 }),
  UserController.saveUser
);
app.post(
  '/user/login',
  body('email').isEmail(),
  // password must be at least 8 chars long
  body('password').isLength({ min: 8 }),
  UserController.login
);
app.post(
  '/user/college/detail',
  UserController.saveUserCollegeDetails
);
app.get(
  '/user/list',
  UserController.usersListWithCollegeDetails
);

module.exports = app