//const nodemailer = require('nodemailer');
// Envío de email
// const output = `
// <div style=>
//   <p>Tienes una nueva solicitud de contacto</p>
//   <img src="cid:footer-img.png" alt=""/>
//   <h3>Detalles del contacto</h3>
//   <ul>
//     <li>Nombre: ${nombre}</li>
//     <li>Correo electrónico: ${correo}</li>
//   </ul>
//   <h3>Mensaje</h3>
//   <p>${mensaje}</p>
// <div/>
// `;

// Crear objeto transportador reutilizable utilizando el transporte SMTP predeterminado

// let transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: `${process.env.USER_EMAIL}`, // generated ethereal user
//     pass: `${process.env.PASS_EMAIL}` // generated ethereal password
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// configurar datos de correo electrónico con símbolos Unicode

// const mailOptions = {
//   from: `"CH | Contact" ${process.env.USER_EMAIL}`, // sender address
//   to: [`${process.env.USER_EMAIL}`], // list of receivers
//   subject: 'CH | Cristian Hernandez Contact Request', // Subject line
//   text: 'Hello world [(?)]', // plain text body
//   html: output // html body
// };
// enviar correo con objeto de transporte definido

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });
