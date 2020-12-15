const server = require('./config/server');
const express = require('express');
const app = express();

const mysqlAdmin = require('node-mysql-admin'); //panel de administración, para acceder
app.use(mysqlAdmin(app)); // localhost:3000/myadmin (ingresar host, user y password)

server(app);

app.listen(app.get('port'), () => {
    console.log(`The app is listening on the port ${app.get('port')}`);
});