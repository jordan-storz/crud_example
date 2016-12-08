// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.LOCAL_DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
