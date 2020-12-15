module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Publicacion', {

        publication_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        publication_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        publication_photo: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        publication_category: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Categoria',
                key: 'category_id'
            }
        },
        publication_user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Usuario',
                key: 'user_id'
            }
        }
    }, {
        tableName: 'Publicacion',
        timestamps: false
    });
};