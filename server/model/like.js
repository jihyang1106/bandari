//글 좋아요 테이블
const like = (Sequelize, DataTypes) =>{
    return Sequelize.define(
        "like",
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId:{
                type: DataTypes.STRING(40),
                allowNull: false,
                
            },
            suppliesId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
        },
        {
            tablename: "like",
            freezeTableName:true,
            timestamps: false
        }
    )
}

module.exports = like;