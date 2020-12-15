const db = require('../../../config/sequelize');
let User = require('../../../config/models/user');

User = User(db.sequelize, db.Sequelize);

const createUser = async(body) => {
    const { userName, userEmail, userPassword } = body;
    const newUser = await User.create({
        user_name: userName,
        user_email: userEmail,
        user_password: userPassword
    });

    const userFormatted = {
        userId: newUser.user_id,
        userName: newUser.user_name,
        userEmail: newUser.user_email,
        userPassword: newUser.user_password
    };
    return userFormatted;
}

const getUserByID = async(id) => {
    const user = await User.findByPk(id);
    if (!id) return null;
    const userFormatted = {
        userName: user.user_name,
        userEmail: user.user_email,
        userPassword: user.user_password
    };
    return userFormatted;
}

const updateUser = async(user_id, body) => {
    const { userName, userEmail, userPassword } = body;
    const userData = {
        user_name: userName,
        user_email: userEmail,
        user_password: userPassword
    };
    const [updatedRow] = await User.update({...userData }, { where: { user_id } });
    return updatedRow;
}

const deleteUser = async(user_id) => {
    const deletedRow = await User.destroy({ where: { user_id } });
    return deletedRow;
}

module.exports = {
    getUserByID,
    updateUser,
    deleteUser,
    createUser
};