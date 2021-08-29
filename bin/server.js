const mongo = require("mongoose");
require('dotenv').config();

const app = require('../app')

const {PORT = 3000} = process.env;
const {DB_HOST} = process.env;

const connection = mongo.connect(DB_HOST);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    process.exit(1)
    console.log(`Server not running. Error message: ${err.message}`)
  });