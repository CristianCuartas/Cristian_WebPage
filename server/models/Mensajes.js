const Sequelize = require('sequelize');
const db = require('../config/database');

const Mensajes = db.define('mensajes', {
  nombre: {
    type: Sequelize.STRING,
    trim: true,
    allowNull: false,
    validate: {
      is: ['^[a-z, A-Z]+$', 'i'],
      notNull: true,
      notEmpty: true
    }
  },
  correo: {
    type: Sequelize.STRING,
    trim: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true
    }
  },
  mensaje: {
    type: Sequelize.STRING,
    trim: true,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
});
module.exports = Mensajes;
