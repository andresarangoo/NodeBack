const httpStatus = require('http-status');
const User = require('./user');
const component = 'User';

const getUserByID = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getUserByID(id);
        if (user) {
            return res
                .status(httpStatus.OK)
                .send(user);
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createUser = async(req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    if (!userName || !userEmail || !userPassword) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incompletos' });
    }
    try {
        const user = await User.createUser(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(user);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear la usuario' });
    }
}

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const wasUpdated = await User.updateUser(id, body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó la marca, la información es igual' });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await User.deleteUser(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Usuario borrada correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Usuario no encontrada' });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getUserByID,
    updateUser,
    createUser,
    deleteUser
};