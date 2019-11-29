const express = require('express');
const router = express.Router();
const Mensajes = require('../models/Mensajes');
const { check, validationResult } = require('express-validator');
/* Envio de EMAILS */
const nodemailer = require('nodemailer');
const USER_EMAIL = 'ccuartashz@gmail.com';
const PASS_EMAIL = 'ccuartas-zH0';
const resolve = require('path').resolve;

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

      const outputAdmin = `
      <div
        style="width:100%;
      box-shadow: 1px 1px 14px #ccc;"
      >
        <img
          src="cid:footer-img.png"
          alt=""
          style="width: 15%; margin-left: 40px;"
        />
        <div style="background: white;padding: 20px;">
          <h2>
            Tienes una nueva solicitud de contacto
          </h2>

          <h3>Detalles del contacto</h3>
          <ul>
            <li>Nombre: ${nombre}</li>
            <li>Correo electrónico: ${correo}</li>
          </ul>
          <h3>Mensaje</h3>
          <p>${mensaje}</p>
        </div>
      </div>
      `;
      /*
Url de la imgen del servidor en el src de la img

Path absoluto en node para acceder a la carpeta
*/
      const outputUser = `
    <div style="width: 100%;
      box-shadow: 1px 1px 14px #ccc;">
      <img src="cid:Pickle_rick.png" alt="" style="width: 10%;  margin-left: 40px;" />
      <div style="background: white;padding: 20px;">
        <h2>
          Hola ${nombre}!
        </h2>
        <h3>Soy Cristian Hernandez desarrollador de software.</h3>
        <p>Tu información de contacto se ha enviado exitosamente.</p>
        <p>Atenderé tu solicitud poniendome en contacto contigo por medio de mi correo electronico:</p>
        <span><b>ccuartashz@gmail.com</b></span>
      </div>
    </div>
      `;

      const mailOptionsAdmin = {
        from: `"CH | Contact" ${USER_EMAIL}`, // sender address
        to: `${USER_EMAIL}`, // list of receivers
        subject: 'CH | Cristian Hernandez SContact Request', // Subject line
        html: outputAdmin, // html body,
        attachments: [
          {
            filename: 'footer-img.png',
            path: resolve('public/Imagenes/footer-img.png'),
            cid: 'footer-img.png' //same cid value as in the html img src
          }
        ]
      };

      const mailOptionsUser = {
        from: `"CH | Contact" ${USER_EMAIL}`, // sender address
        to: `${correo}`, // list of receivers
        subject: 'CH | Cristian Hernandez Solicitud de Contacto', // Subject line
        html: outputUser, // html body,
        attachments: [
          {
            filename: 'Pickle_rick.png',
            path: resolve('public/Imagenes/Pickle_rick.png'),
            cid: 'Pickle_rick.png' //same cid value as in the html img src
          }
        ]
      };

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: `${USER_EMAIL}`, // generated ethereal user
          pass: `${PASS_EMAIL}` // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

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

        transporter.sendMail(mailOptionsAdmin, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        transporter.sendMail(mailOptionsUser, (error, info) => {
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
