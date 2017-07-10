var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos')

var app = express();

//View Engine
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}))

app.use('/', index);
app.use('/api/v1', todos)


var PORT = process.env.PORT || 1337;

app.listen(PORT, function(){
	console.log('Server Listening at PORT ' + PORT);
})