const express = require('express');
const router = express.Router();
const Mensajes = require('../models/Mensajes');
const { check, validationResult } = require('express-validator');
/* Envio de EMAILS */
const nodemailer = require('nodemailer');
const USER_EMAIL = 'ccuartashz@gmail.com';
const PASS_EMAIL = 'ccuartas-zH0';
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxeb686e4318a2442386457d2702d8c47f.mailgun.org';
const mg = mailgun({
  apiKey: '95e1870cef2949acfa95626e6d5841db-e470a504-edb08715',
  domain: DOMAIN
});

const pathHeroku = 'https://cristianwebpage.herokuapp.com/';

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
          style="width: 80%; margin-left: 40px;"
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

      const outputUser = `
    <div style="width: 100%;
      box-shadow: 1px 1px 14px #ccc;">
      <img src="cid:Pickle_rick.png" alt="" style="width: 40%; margin-left: 40px;" />
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
      const dataAdmin = {
        from:
          '"CH | Contact" <postmaster@sandboxeb686e4318a2442386457d2702d8c47f.mailgun.org>',
        to: 'ccuartashz@gmail.com',
        subject: 'CH | Cristian Hernandez Contact Request',
        html: outputAdmin,
        inline: `${pathHeroku}/Imagenes/footer-img.png`
      };

      const mailOptions = {
        from: `"CH | Contact" ${USER_EMAIL}`, // sender address
        to: `${correo}`, // list of receivers
        subject: 'CH | Cristian Hernandez Solicitud de Contacto', // Subject line
        html: outputUser, // html body,
        attachments: [
          {
            filename: 'Pickle_rick.png',
            path: `${pathHeroku}/Imagenes/Pickle_rick.png`,
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
        //Mailgun
        mg.messages().send(dataAdmin, function(error, body) {
          console.log(body);
        });

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
