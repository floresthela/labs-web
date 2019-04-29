const mongoose = require('mongoose')

const Person = new mongoose.model('Person',{
	name: {type: String},
	age: {type: Number},
	born: {type: String},
	timeline: {type: String},
	alliegance: [{type:String}],
	playedBy: {type: String},
	titles: [{type:String}],
	father: {type: String},
	mother: {type: String},
	spouse: {type: String}
})

module.exports = Person