var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var app = express();
const nodemailer = require("nodemailer");

//testing//
var mqtt = require('mqtt');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var User = require('../models/user');
var TestSchemaObject  = require('../models/test');
var EnergyMeterSchemaObject  = require('../models/energymeter');


//initialize mqtt instance for sensornodes.
var mqtt_url = process.env.CLOUDMQTT_URL || 'mqtt://tailor.cloudmqtt.com:13961';
var topic = process.env.CLOUDMQTT_TOPIC || 'Data/#';
console.log("connecting....");
var client = mqtt.connect(mqtt_url,{ "username" : "yfctqndj" , "password" : "nc7J3TeVOEcb"});
console.log("connected with mqtt for sensornodes");


//initialize mqtt instance for energymeters
var mqtt_url1 = process.env.CLOUDMQTT_URL || 'mqtt://tailor.cloudmqtt.com:13962';
var topic1 = process.env.CLOUDMQTT_TOPIC || 'iit_test_bed/#';
console.log("connecting....");
var client1 = mqtt.connect(mqtt_url1,{ "username" : "ogewalhn" , "password" : "sJVhLW-8UZUj"});
console.log("connected with mqtt for energymeters");


//store data in database for sensornodes.

client.on('connect', function(req, res,msg){
  router.post('/publish', function() {
   var msg = JSON.stringify({
   msg: req.body.msg
   });
   });
client.on('reconnect', function(msg) {
      console.log("attempting to reconnect to mongodb server");
});
client.on('diconnected',function(msg){
  console.log('MongoDB disconnected!');
    mongoose.connect(conn, {server:{auto_reconnect:true}});
  });
client.on('close', function(msg) {
      mongoose.connection.close();
});
//  setInterval(function(){client.publish('Data/#', 'my message', function() {
//     console.log("Message is published");},50000);
// });
client.subscribe(topic, function() {
client.on('message', function(topic, msg, pkt) {

var mymsg = msg.toString();
console.log(mymsg);
var res = mymsg.split(",");
var utc = res[0];
var dd  = new Date(utc*1000);
var dd1 =((((dd.getMonth() > 8) ? (dd.getMonth() + 1) : ('0' + (dd.getMonth() + 1))) + '/' + ((dd.getDate() > 9) ? dd.getDate() : ('0' + dd.getDate())) + '/' + dd.getFullYear()));
console.log(dd1)
var tim =  new Date(utc*1000).toTimeString();
var finaltime = tim.slice(0,-31);
console.log(finaltime);
console.log(tim);
var bid = res[1];
var tem = res[2];
var humi = res[3];
var lum = res[4];
var bvol = res[5];
var pir =  res[6];
var rese = res[7]

console.log('UTC='+utc+';Date='+dd1+';time='+finaltime+';boardid = '+bid+'; Temprature = '+tem+';Humidity = '+humi+';Luminosity = '+lum+';bavol ='+bvol+'; PIR ='+pir+';Reserve= '+rese);
var msg =new TestSchemaObject({
       UTC:utc,
       Date:dd1,
       Time:finaltime,
       BoardId: bid,
       temp: tem,
       humidity: humi,
       lumVal: lum,
       bavol:bvol,
       PIR:pir,
       //Reserve:rese
       });
      msg.save().then(function(res){
         console.log(res);
      });

      //email alert for high battry volatage
      if(bvol<2.50){
      	var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'mrudula5.bangale@gmail.com', // generated ethereal user
      pass: 'Soumi@1234' // generated ethereal password
    }
  });

  // send mail with defined transport object
  var mailOptions={
    from: '"Building_Analytics" <mrudula5.bangale@gmail.com>', // sender address
    to: 'mrudula5.bangale@gmail.com', // list of receivers
    subject: "Building_Analytics", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Battry voltage is low please check your setup.</b>" // html body
  };
  transporter.sendMail(mailOptions, function(error, info, res){
    if (error) {
      return console.log(error);
    }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.console('contact',{msg:'Email has been sent'});

  
    });



}
	//email alert when data is not
      if(msg == null){
      	var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'mrudula5.bangale@gmail.com', // generated ethereal user
      pass: 'Soumi@1234' // generated ethereal password
    }
  });

  // send mail with defined transport object
  var mailOptions={
    from: '"Building_Analytics" <mrudula5.bangale@gmail.com>', // sender address
    to: 'mrudula5.bangale@gmail.com', // list of receivers
    subject: "Building_Analytics", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Data is not coming please check your setup.</b>" // html body
  };
  transporter.sendMail(mailOptions, function(error, info, res){
    if (error) {
      return console.log(error);
    }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.console('contact',{msg:'Email has been sent'});
});
}
  });
  });
//store data in database for energymeters.
client1.on('connect', function(req, res1,msg1){
  router.post('/publish', function() {
   var msg1 = JSON.stringify({
   msg1: req.body.msg1
   });
   });
client1.on('reconnect', function(msg) {
      console.log("attempting to reconnect to mongodb server");
});
client1.on('diconnected',function(msg){
  console.log('MongoDB disconnected!');
    mongoose.connect(conn, {server:{auto_reconnect:true}});
  });
client1.on('close', function(msg) {
      mongoose.connection.close();
});

client1.subscribe(topic1, function() {
client1.on('message', function(topic1, msg1, pkt) {

var mymsg1 = msg1.toString();
console.log(mymsg1);
var res1 = mymsg1.split(",");
var utc1 = res1[1];
var dd_e  = new Date(utc1*1000);
var dd1_e =((((dd_e.getMonth() > 8) ? (dd_e.getMonth() + 1) : ('0' + (dd_e.getMonth() + 1))) + '/' + ((dd_e.getDate() > 9) ? dd_e.getDate() : ('0' + dd_e.getDate())) + '/' + dd_e.getFullYear()));
console.log(dd1_e);
var tim_e =  new Date(utc1*1000).toTimeString();
var finaltime_e = tim_e.slice(0,-31);
console.log(finaltime_e);
var bid1 = res1[0];
var ap = res1[2];
var en = res1[3];


console.log('UTC='+utc1+';Date='+dd1_e+';time='+finaltime_e+';boardid = '+bid1+'; Active_Power = '+ap);
var msg1 =new EnergyMeterSchemaObject({
       UTC:utc1,
       Date:dd1_e,
       Time:finaltime_e,
       Box_Id: bid1,
       Active_Power:ap,
       Energy:en
       
       });
      msg1.save().then(function(res1){
         console.log(res1);
      });
   });
   });

});
});

//Login
router.get('/login', function(req, res){
	res.render('login');
});

//Admin_login
router.get('/Admin_login',function(res,res){
  res.render('Admin_login');
});


//Register
router.get('/register', function (req, res) {
	res.render('register');
});

//Analytics
router.get('/anayltics', function (req, res) {
	res.render('anayltics');
});

//Dashboard for sensornodes
router.get('/about', function(req, res){
	TestSchemaObject.find({},'-_id -__v',function (err, test){
		if (err)return res.send(err)
		res.render('about',{tests:test});
});
});


//json data frame for all the data of sensornodes.
router.get('/api/data', function(req, res){
	TestSchemaObject.find({},'-_id -__v',function (err, test){
		if (err)return res.send(err)
		res.send(test);
});
});



//energymeters data
router.get('/energymeters', function(req, res){
	EnergyMeterSchemaObject.find({},'-_id -__v',function (err, energymeter){
		if (err)return res.send(err)
		res.render('energymeters',{energymeters:energymeter});
});
});

router.get('/api/data1', function(req, res){
	EnergyMeterSchemaObject.find({},'-_id -__v',function (err, energymeter){
		if (err)return res.send(err)
		res.send(energymeter);
});
});

//select location for the sensornodes
router.get('/loc1',function(req,res){
	res.render('loc1');
});
//select location for the energymeters
router.get('/loc2',function(req,res){
  res.render('loc2');
});

//select status for the sensornodes
router.get('/status1',function(req,res){
  res.render('status1');
});

//select status for the energymeters
router.get('/status2',function(req,res){
  res.render('status2');
});


//Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email= req.body.email;
	var username = req.body.username;
	var password =  req.body.password;
	var password2 = req.body.password2;

	//validation
	req.checkBody('name' , 'Name is required').notEmpty();
	req.checkBody('email' , 'email is required').notEmpty();
	req.checkBody('email' , 'email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 character long.').len(4,15);
	req.checkBody('password' , 'password is required').notEmpty();
	req.checkBody('password2' , 'passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
				errors:errors
		});
	}else{
		var newUser = new User({
			name : name,
			email:email,
			username:username,
			password:password
		});

		User.createUser(newUser, function(err, user){
			if(err)throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}


});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null,false ,{message: 'Unknown User'});
    	}

    	User.comparePassword(password, user.password, function(err, isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false ,{message: 'Invalid password'});
    		}

    	});
    });
      
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.post('/login',passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
   res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});
module.exports = router;