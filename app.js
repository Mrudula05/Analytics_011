var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mqtt = require('mqtt');
var cors = require('cors');
var request = require('request');



mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/Building_Analytics', {keepAlive: true,keepAliveInitialDelay: 10000,useNewUrlParser: true,reconnectTries: Number.MAX_VALUE,reconnectInterval: 500,auto_reconnect: true}).
catch(error => handleError(error));
var db = mongoose.connection;



var routes = require('./routes/index.js');
var users = require('./routes/users.js');
//var admins = require('./routes/admins.js');



//Init App
var app = express();

//View Engine
app.set('views', path.join(__dirname+ '/views/layouts'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.use(cors()); 
app.set('view engine','handlebars');


//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//set Static Folder
app.use(express.static(path.join(__dirname,'./public')));

//Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param,  msg, value){
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';		
	}
	return {
		param : formParam,
		msg   : msg,
		value : value
	};
}
}));

//connect Flash
app.use(flash());

//Global Vars
app.use(function( req,res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null
	next();
	
});
app.use('/', routes);

app.use('/users', users);

//app.use('/admins', admins);



//set port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('server started on port' +app.get('port'));
});