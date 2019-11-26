const express = require('express');
const router = express.Router();

module.exports = function() {
  router.get('/', (req, res) => {
    res.render('index');
  });

  /* Cuando se llena el formulario */
  router.post('/', (req, res) => {
    console.log(req.body);
    let { nombre, correo, mensaje } = req.body;
    let errores = [];
    if (!nombre) {
      errores.push({ mensaje: 'Agrega tu nombre' });
    }
    if (!correo) {
      errores.push({ mensaje: 'Agrega tu correo' });
    }
    if (!mensaje) {
      errores.push({ mensaje: 'Agrega tu mensaje' });
    }
    //Revisar por errores
    if (errores.length > 0) {
      //muestra la vista con errores
      res.render('index', {
        errores,
        nombre,
        correo,
        mensaje
      });
    } else {
      //Almacena en la BD
      //   Testimonial.create({
      //     nombre,
      //     correo,
      //     mensaje
      //   })
      //     .then(testimonial => res.redirect('/testimoniales'))
      //     .catch(error => console.log(error));
    }
  });

  return router;
};
