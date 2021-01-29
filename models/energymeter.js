const mongoose = require('mongoose');

const EnergyMeterSchema = mongoose.Schema({

  UTC:String,
  Date:String,
  Time:String,
  Box_Id:String,
  Active_Power:String,
  Energy:String
  
},
{
	__v: false
});

const EnergyMeterSchemaObject =  module.exports = mongoose.model('energymeter', EnergyMeterSchema);