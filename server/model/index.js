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

db.user = require('./user')(sequelize, Sequelize);
db.pet = require('./pet')(sequelize, Sequelize);
db.supplies = require('./supplies')(sequelize, Sequelize);
db.img = require('./img')(sequelize, Sequelize);
db.pick = require('./pick')(sequelize, Sequelize);
db.room = require('./room')(sequelize, Sequelize);
db.chat = require('./chat')(sequelize, Sequelize);

// user 삭제 => pet 삭제
db.user.hasMany(db.pet, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.pet.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// user 삭제 => supplies 삭제
db.user.hasMany(db.supplies, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.supplies.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// user 삭제 => pick 삭제
db.user.hasMany(db.pick, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.pick.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// user 삭제 => room 삭제
db.user.hasMany(db.room, {
  foreignKey: 'otherId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.room.belongsTo(db.user, {
  foreignKey: 'otherId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// user 삭제 => room 삭제
db.user.hasMany(db.room, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.room.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// user 삭제 => chat 삭제
db.user.hasMany(db.chat, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.chat.belongsTo(db.user, {
  foreignKey: 'otherId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// pet 삭제 => supplies 삭제
db.pet.hasMany(db.supplies, {
  foreignKey: 'petId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.supplies.belongsTo(db.pet, {
  foreignKey: 'petId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// supplies 삭제 => img 삭제
db.supplies.hasMany(db.img, {
  foreignKey: 'suppliesId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.img.belongsTo(db.supplies, {
  foreignKey: 'suppliesId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// supplies 삭제 => pick 삭제
db.supplies.hasMany(db.pick, {
  foreignKey: 'suppliesId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.pick.belongsTo(db.supplies, {
  foreignKey: 'suppliesId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// supplies 삭제 => room 삭제
db.supplies.hasMany(db.room, {
  foreignKey: 'suppliesId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.room.belongsTo(db.supplies, {
  foreignKey: 'suppliesId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// room 삭제 => chat 삭제
db.room.hasMany(db.chat, {
  foreignKey: 'roomId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.chat.belongsTo(db.room, {
  foreignKey: 'roomId',
  targetKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

module.exports = db;
