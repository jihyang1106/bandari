const pet = require('./pet');

//user 테이블
const user = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
    },
    {
      tablename: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = user;
