module.exports = (sequelize, DataTypes) => {
    return sequelize.define('API_Like', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        like_user: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            references: {
                model: 'Usuario',
                key: 'user_id'
            }
        },
        like_publication: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Publicacion',
                key: 'publication_id'
            }
        },
        like_date: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'API_Like',
        timestamps: false
    });
};