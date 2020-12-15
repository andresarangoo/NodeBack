const httpStatus = require('http-status');
const Like = require('./like');
const component = 'Like';


const getLikes = async(req, res) => {
    try {
        const like = await Like.getLikes();
        return res
            .status(httpStatus.OK)
            .send(like);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información' });
    }
}

const createLike = async(req, res) => {
    const { likeUser, likePublication, likeDate } = req.body;
    if (!likeUser || !likePublication || !likeDate) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incompletos' });
    }
    try {
        const like = await Like.createLike(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(like);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el like' });
    }
}

const deleteLike = async(req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Like.deleteLike(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Like borrada correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Like no encontrada' });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getLikes,
    createLike,
    deleteLike
};