const express = require('express');
const path = require('path');
const db = require('./config/database');
const routes = require('./routes');
const bodyParser = require('body-parser');

/* Conexión a al base de datos. */
db.authenticate()
  .then(() => console.log('DB CONECTED'))
  .catch(error => console.log(console.error()));

const app = express();
/* Habilitar pug */
app.set('view engine', 'pug');

/* Añadir las vistas */
app.set('views', path.join(__dirname, './views'));

/* Cargar carpeta estatica */
app.use(express.static('public'));

/* body-parser => Middleware - Lo uso para leer el post del form */
app.use(bodyParser.urlencoded({ extended: true }));

/* Cargar las rutas */
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
console.log(host, port);
app.listen(port, host, () => {
  console.log('El servidor esta funcionando');
});
