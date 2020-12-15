const { Sequelize } = require('sequelize');

const host = 'prevalentware.c3rkad1ay1ao.us-east-1.rds.amazonaws.com';
const user = 'admin';
const password = 'Prevalent.2020';
const database = 'bd_test_django_aa';
const dialect = 'mysql';

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
});

sequelize.sync({ alter: true }).then(() => { console.log("listo") }).catch(error => { console.error(error) });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;