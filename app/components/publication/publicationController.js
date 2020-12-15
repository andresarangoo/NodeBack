const httpStatus = require('http-status');
const Publication = require('./publication');
const component = 'Publication';


const getPublications = async(req, res) => {
    try {
        const publications = await Publication.getPublications();
        return res
            .status(httpStatus.OK)
            .send(publications);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información' });
    }
}

const getPublicationByID = async(req, res) => {
    const { id } = req.params;
    try {
        const publication = await Publication.getPublicationByID(id);
        if (publication) {
            return res
                .status(httpStatus.OK)
                .send(publication);
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createPublication = async(req, res) => {
    const { publicationName, publicationUser, publicationPhoto, publicationCategory } = req.body;
    if (!publicationName || !publicationUser || !publicationPhoto || !publicationCategory) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incompletos' });
    }
    try {
        const publication = await Publication.createPublication(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(publication);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear la publicacion' });
    }
}

const deletePublication = async(req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Publication.deletePublication(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Publicacion borrada correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Publicacion no encontrada' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getPublications,
    getPublicationByID,
    createPublication,
    deletePublication
};