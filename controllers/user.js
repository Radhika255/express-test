const UserModel = require('../models/User');
const CollegeDetailModel = require('../models/collegeDetail');
const AuthService = require('../services/auth-service');
const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
module.exports = {
  saveUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = new UserModel(req.body);
      user = await user.save();
      return res.json({
        statusCode: 200,
        data: { user },
        message: "User Data Saved"
      });
    } catch (error) {
      console.log(error);
      res.json({
        statusCode: 500,
        data: error,
        message: "Error"
      })
    }
  },
  login: async (req, res) => {
    try {
      let user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
      console.log(user);
      let authToken = jwt.sign({
        data: {
          id: user._id,
          email: user.email
        }
      }, `SecretKey`, { expiresIn: '10days' });
      if (user) {
        return res.json({
          statusCode: 200,
          data: {
            authToken: 'Bearer ' + authToken,
            user
          },
          message: "User successfully login"
        });
      } else {
        return res.json({
          statusCode: 500,
          data: {},
          message: "Invalid credentials"
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        statusCode: 500,
        data: error,
        message: "Error"
      })
    }
  },
  saveUserCollegeDetails: async (req, res) => {
    try {
      let authData = await AuthService(req);
      console.log(authData);
      if (!authData) {
        return res.json({
          statusCode: 500,
          data: {},
          message: "Send Authorization Token"
        });
      }
      req.body.userId = authData.data.id
      let detail = new CollegeDetailModel(req.body);
      detail = await detail.save();
      return res.json({
        statusCode: 200,
        data: { detail },
        message: "User College Details Saved"
      });
    } catch (error) {
      console.log(error);
      res.json({
        statusCode: 500,
        data: error,
        message: "Error"
      })
    }
  },
  usersListWithCollegeDetails: async (req, res) => {
    try {
      let user = await UserModel.aggregate([{
        $lookup: {
          from: "collegedetails",
          let: { "userId": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userId", "$userId"]
                }
              }
            }
          ],
          as: "CollegeDetails"
        }
      }])
      return res.json({
        statusCode: 200,
        data: user,
        message: "UserDate"
      })
    } catch (error) {
      console.log(error);
      return res.json({
        statusCode: 500,
        data: error,
        message: "Error"
      })
    }
  }
}