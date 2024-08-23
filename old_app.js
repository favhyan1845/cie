/*  1. Se invoca express */
const express = require('express');
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser');


// const request = require('request');
// const bodyParser = require('body-parser');
// const { ppid } = require('process');
app.use(cookieParser());

/* 2. Seteamos  urlencode para capturar los datos del formulario*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* 3. El directorio Public */
app.use(express.static(path.join(__dirname, 'public')));

/* 4. Estableciendo el motor de plantillas ejs */
app.set('view engine', 'ejs');

/* 5. Variables de sesión */
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

/* 6. estableciendo puerto */
app.set('port', process.env.PORT || 3000);
/* 7. estableciendo vistas */
app.set('views', path.join(__dirname, 'views'));

/* 8.routes */
const User = require('./routes/users/index');
const Incidents = require('./routes/incidents/index');
const Event = require('./routes/events/index');
const SIRE = require('./routes/SIRE/index');


app.use('/', User);
app.use('/incidents', Incidents);
app.use('/events', Event);
app.use('/SIRE', SIRE);



app.listen(app.get('port'), () => {
    console.log(`servidor en puerto ${app.get('port')}`);
})
