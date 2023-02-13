const img = (Sequelize, DataTypes) =>{
    return Sequelize.define(
        "img",
        {
            imgId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            suppliesId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            img1:{
                type: DataTypes.STRING(30),
                allowNull: false,
                
            },
            img2:{
                type: DataTypes.STRING(30),
                allowNull: true,
                
            },
            img3:{
                type: DataTypes.STRING(30),
                allowNull: true,
                
            },
        },
        {
            tablename: "img",
            freezeTableName:true,
            timestamps: false
        }
    )
}

module.exports = img;