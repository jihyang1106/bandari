//반려동물 프로필 테이블
const pet = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'pet',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      petSpecies: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      petType: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      petImg: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      Info: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      tablename: 'pet',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = pet;
