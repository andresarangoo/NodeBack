module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'Usuario',
        timestamps: false
    });
};