const fs = require('fs')
const db = require('mysql')

let contentBrokers = fs.readFileSync('./data/brokers.json', 'utf8')
console.log(contentBrokers)

let brokers = JSON.parse(contentBrokers)
console.log(brokers)

// Create homefinder??

// Create connection to database
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'alexandra',
    password : 'secret',
    database : 'homefinder'
})

// Connect to database
connection.connect()

// Create table Broker

// Loop through brokers and insert into table Broker
for(let broker in brokers) {
    connection.query('INSERT INTO broker SET ?', broker, (error, results, fields) => {
        if (error) throw error
        console.log('The broker is: ', results[0].broker)
    });
}
   
// Disconnect from database
connection.end()


// Happy coding =)