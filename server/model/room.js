// 반려동물 용품 테이블
const room = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'room',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      suppliesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      buyer: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      seller: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      tablename: 'room',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = room;
