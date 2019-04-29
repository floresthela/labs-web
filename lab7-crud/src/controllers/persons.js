const Person = require('../models/person')

const getPersons = function(req,res){
	Person.find({}).then(function(persons){
		if(!persons){
			return res.status(404).send("No hay nadie")
		}
		return res.status(200).json(persons)
	}).catch(function(error){
		return res.status(500).send(error)
	})	
}

const getPersonById = function(req,res){
	const id = req.params.id
	Person.findById(id).then(function(person){
		if(person){
			return res.status(200).send(person)
		} else {
			return res.send("This person doesn't exist!!")
		}
	}).catch(function(error){
		return res.status(500).send(error)
	})
}

const deletePerson = function(req,res){
	const id = req.params.id

	Person.findByIdAndRemove(id).then(function(person){
		if(!person){
			return res.status(404).send("No existe ese id")
		} 
		return res.send(person)

	}).catch(function(error){
		res.status(505).send(error)
	})
}
const postPerson = function(req,res){
	const person = new Person(req.body)
	person.save().then(function(){
		return res.send(person)
	}).catch(function(error){
		return res.status(400).send(error)
	})
}
const patchPersonById = function(req, res){
	const id = req.params.id

	Person.findByIdAndUpdate(id,req.body,{new: true}).then(function(person){
		if(person){
			return res.send(person)

		} else{
			return res.status(404).send("No existe")
		}
	}).catch(function(error){
		res.status(500).send(error)
	})
}

module.exports = {
	getPersons,
	getPersonById,
	deletePerson,
	postPerson,
	patchPersonById
}

