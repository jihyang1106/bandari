const development = {
  host: process.env.PUBLIC_IP,
  database: process.env.DB,
  username: process.env.DBUSER,
  password: process.env.PASSWORD,
  dialect: 'mysql',
};

const production = {
  host: process.env.PUBLIC_IP,
  database: process.env.DB,
  username: process.env.DBUSER,
  password: process.env.PASSWORD,
  dialect: 'mysql',
};

module.exports = { development, production };
