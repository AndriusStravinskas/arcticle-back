const dotenv = require('dotenv');

dotenv.config();

const {
  SERVER_PORT,
  SERVER_DOMAIN,
  MONGODB_SERVER,
} = process.env;

if (
  SERVER_PORT === undefined
  || SERVER_DOMAIN === undefined
  || MONGODB_SERVER === undefined
) {
  throw new Error("Please define constants in '.env' file");
}

const config = {
  server: {
    domain: SERVER_DOMAIN,
    port: SERVER_PORT,
  },
  mongoDB: {
    uri: MONGODB_SERVER,
  },
};

module.exports = config
