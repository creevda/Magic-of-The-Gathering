require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB',
  },
  test: {
    username: 'and_ray',
    password: '123',
    database: 'magic',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'and_ray',
    password: '123',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
