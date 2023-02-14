// 반려동물 용품 테이블
const supplies = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'supplies',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('current_date'),
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tablename: 'supplies',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = supplies;
