const user = (Sequelize, DataTypes) =>{
    return Sequelize.define(
        "user",
        {
            id:{
                type: DataTypes.STRING(40),
                allowNull: false,
                primaryKey: true
            },
            nickName:{
                type: DataTypes.STRING(10),
                allowNull: false,
                
            },
            phone:{
                type: DataTypes.STRING(15),
                allowNull: false,
                
            },
            petId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
        },
        {
            tablename: "user",
            freezeTableName:true,
            timestamps: false
        }
    )
}

module.exports = user;