//글 좋아요 테이블
const pick = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'pick',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      suppliesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tablename: 'pick',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = pick;
