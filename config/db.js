const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const port = process.env.DB_PORT;
console.log(`mongodb://${host}:${port}/${database}`);
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(`mongodb://${host}:${port}/${database}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).then(() => {
      console.log("Database Connection Successfull");
    }).catch(err => {
      console.log("Database connection err :: " + err);
    })
  }
}

module.exports = new Database;
