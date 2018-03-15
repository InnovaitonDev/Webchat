const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './../public')));

var session = require('express-session')
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));

app.get('/recst', (req, res, next) => {
    let sessionId = req.sessionID;  // is generated each time React client send request, works fine with api alone!
    console.log(sessionId);

    if (!sessionId) return res.status(401).send('Unauthorized Error');
    res.status(200).send({ data });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});
