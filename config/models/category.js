module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Categoria', {
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        category_photo: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        category_emoji: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'Categoria',
        timestamps: false
    });
};