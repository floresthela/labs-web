const express = require('express')
const router = express.Router()
const Person = require('./models/person')
const persons = require('./controllers/persons')

/*
Tendrán las (5) rutas siguientes:
    CREATE
        POST /persons
    READ
        GET  /persons
        GET  /persons/:id
    UPDATE
        PATCH /persons/:id
    DELETE
        PATCH /persons/:id
*/

router.post('/persons', persons.postPerson)

router.get('/persons', persons.getPersons)
router.get('/persons/:id', persons.getPersonById)

router.patch('/persons/:id', persons.patchPersonById)

router.delete('/persons/:id', persons.deletePerson)

module.exports = router