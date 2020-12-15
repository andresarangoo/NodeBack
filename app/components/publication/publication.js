const db = require('../../../config/sequelize');
let Publication = require('../../../config/models/publication');
let User = require('../../../config/models/user');
let Category = require('../../../config/models/category');

User = User(db.sequelize, db.Sequelize);
Category = Category(db.sequelize, db.Sequelize);
Publication = Publication(db.sequelize, db.Sequelize);

User.hasMany(Publication, { foreignKey: "publication_user" });
Publication.belongsTo(User, { foreignKey: "publication_user" });

Category.hasMany(Publication, { foreignKey: "publication_category" });
Publication.belongsTo(Category, { foreignKey: "publication_category" });

const createPublication = async(body) => {
    const { publicationName, publicationUser, publicationPhoto, publicationCategory } = body;
    const newPublication = await Publication.create({
        publication_name: publicationName,
        publication_user: publicationUser,
        publication_photo: publicationPhoto,
        publication_category: publicationCategory
    });

    const publicationFormatted = {
        publicationName: newPublication.publication_name,
        publicationUser: newPublication.publication_user,
        publicationPhoto: newPublication.publication_photo,
        publicationCategory: newPublication.publication_category
    };
    return publicationFormatted;
}

const getPublications = async() => {
    const publications = await Publication.findAll();
    const publicationsFormatted = publications.map(publication => {
        return {
            publicationName: publication.publication_name,
            publicationPhoto: publication.publication_photo,
            publicationUser: publication.publication_user,
            publication_category: publication.publication_category
        };
    });
    console.log(publicationsFormatted)
    return publicationsFormatted;
}

const getPublicationByID = async(id) => {
    const publication = await Publication.findByPk(id);
    if (!publication) return null;
    const publicationFormatted = {
        publicationName: publication.publication_name,
        publicationUser: publication.publication_user,
        publicationPhoto: publication.publication_photo,
        publicationCategory: publication.publication_category
    };
    return publicationFormatted;
}

const deletePublication = async(publication_id) => {
    const deletedRow = await Publication.destroy({ where: { publication_id } });
    return deletedRow;
}

module.exports = {
    getPublicationByID,
    getPublications,
    deletePublication,
    createPublication
};