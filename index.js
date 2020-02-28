const express = require('express')
const tojson = require('./toJson')
const tordbm = require('./toRdbm')
const database = require('./database')

const port = 8020

const app = express()

const helpPage = 
    "<html>"  + 
        "<head><title>Homefinderutil help</title></head>" +
        "<body>" +
            "<h1>Help information</h1>" +
            "<p>'/tojson' convert text to json</p>" +
            "<p>'/tordbm' convert json to rdbm</p>" +
        "</body>" +
    "</html>"

app.get('/', (request, response) => {
    // Output help text
    response.send(helpPage)
})

app.get('/tojson', (request, response) => {
    // Run conversion from text to json format
    tojson.convert()
    response.send('Text to json conversion!')
})

app.get('/tordbm', (request, response) => {
    // Run conversion from json to rdbm format
    tordbm.convert()
    response.send('Json to rdbm conversion!')
})

app.get('/createdb', (request, response) => {
    console.log('Running /createdb ...')
    try {
        database.createDatabase()
        response.send('Database created')
    } catch (error) {
        response.send(error)
    }
})

app.get('/deletedb', (request, response) => {
    console.log('Running /deletedb ...')
    try {
        database.deleteDatabase()
        response.send('Database deleted')
    } catch (error) {
        response.send(error)
    }
})

app.get('/createtables', (request, response) => {
    console.log('Running /createtables ...')
    try {
        database.createTables()
        response.send('Tables created')
    } catch (error) {
        response.send(error)
    }
})

app.get('/deletetables', (request, response) => {
    console.log('Running /deletetables ...')
    try {
        database.deleteTables()
        response.send('Tables deleted')
    } catch (error) {
        response.send(error)
    }
})

app.get('/setupdb', async (request, response)  =>  {
    console.log('Running /setupdb ...')
    try {
        await database.createDatabase()
        await database.createTables()
        await tordbm.convert()
        response.send('Database setup done')
    } catch (error) {
        response.send(error)
    }
})

app.listen(port, () => {
    console.log(`Homefinderutil listening on port ${port}!`)
})