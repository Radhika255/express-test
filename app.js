const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const userApi = require('./routes/user');
const connect = require('./config/db');
const app = express();
require('dotenv')

const port = process.env.PORT || 3000;

//view engin setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//render to the signup form
app.get('/', (req, res) => {
  res.render('form')
})

app.use('/api', userApi)

//CALLBACK (CAN BE USE AS EXAMPLE OF CALLBACK)
app.listen(process.env.PORT, () => {
  console.log(`==========Now we are listening on port ${port}==========`);
})
