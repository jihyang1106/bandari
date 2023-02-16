const Sequelize = require('sequelize');
const config = require('../config/config')['development'];

// db connection
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize)
db.pet = require("./pet")(sequelize, Sequelize)
db.supplies = require("./supplies")(sequelize, Sequelize)
db.img = require("./img")(sequelize, Sequelize)
db.like = require("./like")(sequelize, Sequelize)

db.user.hasMany(db.pet, {
  foreignKey : "id",
  constraints 
})

// -------user.petId-------
// db.user.hasMany(db.pet,{
//   foreignKey: "id",
//   sourcekey:"petId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.pet.belongsTo(db.user,{
//   foreignKey: "id",
//   sourcekey:"petId",
//   onDelete:"casacade",
//   onUpdate:"cascade"
// });

// // -------supplies.petId-----

// db.supplies.hasMany(db.pet,{
//   foreignKey: "id",
//   sourcekey:"petId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.pet.belongsTo(db.supplies,{
//   foreignKey: "id",
//   sourcekey:"petId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// // ----supplies.userId-------

// db.supplies.hasMany(db.user,{
//   foreignKey: "id",
//   sourcekey:"userId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.user.belongsTo(db.supplies,{
//   foreignKey: "id",
//   sourcekey:"userId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// // ------img.suppliesId--------

// db.img.hasMany(db.supplies,{
//   foreignKey: "id",
//   sourcekey:"suppliesId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.supplies.belongsTo(db.img,{
//   foreignKey: "id",
//   sourcekey:"suppliesId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// // ------like.userId---------

// db.like.hasMany(db.user,{
//   foreignKey: "id",
//   sourcekey:"userId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.user.belongsTo(db.like,{
//   foreignKey: "id",
//   sourcekey:"userId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// // ------like.suppliesId-------

// db.like.hasMany(db.supplies,{
//   foreignKey: "id",
//   sourcekey:"suppliesId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });

// db.supplies.belongsTo(db.like,{
//   foreignKey: "id",
//   sourcekey:"suppliesId",
//   onDelete:"casacade",
//   onUpdate:"casacade"
// });


module.exports = db;