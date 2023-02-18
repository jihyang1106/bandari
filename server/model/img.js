//판매글 이미지 테이블
const img = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'img',
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
      img1: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      img2: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      img3: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tablename: 'img',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = img;
