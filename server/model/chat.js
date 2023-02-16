// 반려동물 용품 테이블
const chat = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'chat',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      msg: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tablename: 'chat',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = chat;
