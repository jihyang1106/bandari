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
db.like = require('./like')(sequelize, Sequelize);
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

// user 삭제 => like 삭제
db.user.hasMany(db.like, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.like.belongsTo(db.user, {
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

// supplies 삭제 => like 삭제
db.supplies.hasMany(db.like, {
  foreignKey: 'suppliesId',
  sourceKey: 'id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
db.like.belongsTo(db.supplies, {
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
