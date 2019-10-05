var express = require('express');
var app = express();
app.use(express.static('pagina'));

app.listen(80);