const express = require('express');
const router = express.Router();
const Mensajes = require('../models/Mensajes');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

module.exports = function() {
  router.get('/', (req, res) => {
    res.render('index');
  });

  /* Cuando se llena el formulario */
  router.post(
    '/',
    [
      check('nombre')
        .isString()
        .not()
        .isEmpty()
        .withMessage('Agrega tu nombre')
        .trim(),
      check('correo')
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Agrega tu email')
        .trim(),
      check('mensaje')
        .isString()
        .not()
        .isEmpty()
        .withMessage('Agrega tu mensaje')
        .trim()
    ],
    (req, res) => {
      let { nombre, correo, mensaje } = req.body;
      let errores = [];
      if (!nombre || nombre === ' ') {
        errores.push({ mensaje: 'Agrega tu nombre' });
      }
      if (!correo || correo === ' ') {
        errores.push({ mensaje: 'Agrega tu correo' });
      }
      if (!mensaje || mensaje === ' ') {
        errores.push({ mensaje: 'Agrega tu mensaje' });
      }

      // Envío de email
      const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Nombre: ${nombre}</li>
          <li>Correo electrónico: ${correo}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${mensaje}</p>
      `;

      // Crear objeto transportador reutilizable utilizando el transporte SMTP predeterminado
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: `${process.env.USER_EMAIL}`, // generated ethereal user
          pass: `${process.env.PASS_EMAIL}` // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // configurar datos de correo electrónico con símbolos Unicode
      const mailOptions = {
        from: `"CH | Contact" ${process.env.USER_EMAIL}`, // sender address
        to: [`${process.env.USER_EMAIL}`], // list of receivers
        subject: 'CH | Cristian Hernandez Contact Request', // Subject line
        text: 'Hello world [(?)]', // plain text body
        html: output // html body
      };

      //Revisar por errores
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render('index', {
          errores,
          nombre,
          correo,
          mensaje
        });
      } else {
        //Almacena en la BD
        Mensajes.create({
          nombre,
          correo,
          mensaje
        })
          .then(mensaje => res.redirect('/#mis-trabajos'))
          .catch(error => console.log(error));
        // enviar correo con objeto de transporte definido
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
      }
    }
  );

  return router;
};
