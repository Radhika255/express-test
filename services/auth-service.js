const jwt = require("jsonwebtoken");

module.exports = async (req) => {
  var token = (req.headers.authorization ? req.headers.authorization.split(" ")[1] : "")
    || (req.body && req.body.access_token)
    || req.body.token
    || req.query.token
    || req.headers['x-access-token'];
  try {
    const decode = jwt.decode(token, 'SecretKey');
    return decode;
  } catch (error) {
    return error
  }
}