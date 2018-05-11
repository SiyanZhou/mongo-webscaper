var Sequelize = require("sequelize");

var sequelize = new Sequelize("yty7lta08zutn2mm", "ooy00duznsn0hht8", "doq8rlras8j0tvqq", {
    host: "umabrisfx8afs3ja.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
});

module.exports = sequelize;