const Sequelize = require('sequelize');
const db = require('../config/database');

const Mensajes = db.define('mensajes', {
  nombre: {
    type: Sequelize.STRING
  },
  correo: {
    type: Sequelize.STRING
  },
  mensaje: {
    type: Sequelize.STRING
  }
});
module.exports = Mensajes;
