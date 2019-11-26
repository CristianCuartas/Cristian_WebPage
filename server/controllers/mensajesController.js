const Mensajes = require('../models/Mensajes');

exports.agregarTestimonial = async (req, res) => {
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
    const mensajes = await Mensajes.findAll();
    res.render('mensajes', {
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales
    });
  } else {
    Mensajes.create({
      nombre,
      correo,
      mensaje
    })
      .then(mensaje => res.redirect('#mis-trabajos'))
      .catch(error => console.log(error));
  }
};
