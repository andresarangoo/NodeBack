const db = require('../../../config/sequelize');
let Like = require('../../../config/models/like');
let Publication = require('../../../config/models/publication');
let User = require('../../../config/models/user');

User = User(db.sequelize, db.Sequelize);
Like = Like(db.sequelize, db.Sequelize);
Publication = Publication(db.sequelize, db.Sequelize);

User.hasMany(Like, { foreignKey: "like_user" });
Like.belongsTo(User, { foreignKey: "like_user" });

Publication.hasMany(Like, { foreignKey: "like_publication" });
Like.belongsTo(Publication, { foreignKey: "like_publication" });

const createLike = async(body) => {
    const { likeUser, likePublication, likeDate } = body;
    const newLike = await Like.create({
        like_user: likeUser,
        like_publication: likePublication,
        like_date: likeDate
    });

    const likeFormatted = {
        likeUser: newLike.like_user,
        likePublication: newLike.like_publication,
        likeDate: newLike.like_date
    };
    return likeFormatted;
}

const getLikes = async() => {
    const likes = await Like.findAll();
    const likeFormatted = likes.map(like => {
        return {
            likeUser: like.like_user,
            likePublication: like.like_publication,
            likeDate: like.like_date
        };
    });
    return likeFormatted;
}

const deleteLike = async(id) => {
    const deletedRow = await Like.destroy({ where: { id } });
    return deletedRow;
}

module.exports = {
    getLikes,
    deleteLike,
    createLike
};