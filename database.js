const mysql = require('mysql2')

const databaseConnectionInfo = {
    host: 'mysql',
    user: 'root',
    password: 'example'
}
const databasePool = mysql.createPool(databaseConnectionInfo)
const databasePoolPromise = databasePool.promise()

// TODO: Export for use in toRdbm module
const homeFinderConnectionInfo = {
    host: 'mysql',
    user: 'root',
    password: 'example',
    database: 'homefinder'
}
const homeFinderPool = mysql.createPool(homeFinderConnectionInfo)
const homeFinderPoolPromise = homeFinderPool.promise()


const createDatabase = async function () {
    try {
        await databasePoolPromise.query("CREATE DATABASE IF NOT EXISTS homefinder")
        console.log("Database homefinder created")
    } catch (error) {
        console.log("Database homefinder creation failed")
    }
}

const deleteDatabase = async function () {
    try {
        await databasePoolPromise.query("DROP DATABASE IF EXISTS homefinder")
        console.log('Database homefinder deleted')
    } catch (error) {
        console.log('Database homefinder deletion failed')
    }
}

const createTables = async function () {
    await createBrokerTable()
    await createHomeTable()
    await createSaleTable()
    await createApartmentTable()
    await createHouseTable()
    await createImageTable()
    await createUserTable()
    await createTokenTable()
}

const createTable = async function (tableName, createTableQuery) {
    try {
        await homeFinderPoolPromise.query(createTableQuery)
        console.log(`Table ${tableName} created!`)
    } catch (error) {
        console.log(`Table ${tableName} creation failed!`)
    }
}

const createBrokerTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS broker (
        id int primary key auto_increment,
        name varchar(50) NOT NULL,
        phone varchar(20) NOT NULL,
        email varchar(100) NOT NULL
    )`
    await createTable('broker', createTableQuery)
}

const createHomeTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS home (
        id INT PRIMARY KEY AUTO_INCREMENT,
        address VARCHAR(100) NOT NULL,
        description VARCHAR(2000) NOT NULL,
        livingspace FLOAT NOT NULL,
        rooms INT NOT NULL,
        built INT NOT NULL,
        operationcost INT NOT NULL
    )`
    await createTable('home', createTableQuery)
}

const createApartmentTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS apartment (
        id INT PRIMARY KEY AUTO_INCREMENT,
        apartmentnumber INT NOT NULL,
        charge INT NOT NULL,
        homeid INT NOT NULL,
        CONSTRAINT fk_apartment_home FOREIGN KEY (homeid) REFERENCES home(id)
    )`
    await createTable('apartment', createTableQuery)
}

const createHouseTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS house (
        id INT PRIMARY KEY AUTO_INCREMENT,
        cadastral VARCHAR(50) NOT NULL,
        structure VARCHAR(25) NOT NULL,
        plotsize INT NOT NULL,
        ground VARCHAR(25) NOT NULL,
        homeid INT NOT NULL,
        CONSTRAINT fk_house_home FOREIGN KEY (homeid) REFERENCES home(id)
    )`
    await createTable('house', createTableQuery)
}

const createImageTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS image (
        id INT PRIMARY KEY AUTO_INCREMENT,
        imagename VARCHAR(40) NOT NULL,
        homeid INT NOT NULL,
        CONSTRAINT fk_image_home FOREIGN KEY (homeid) REFERENCES home(id)
    )`
    await createTable('image', createTableQuery)
}

const createSaleTable = async function () {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS sale (
        id INT PRIMARY KEY AUTO_INCREMENT,
        date VARCHAR(10) NOT NULL,
        price INT NOT NULL,
        homeid INT NOT NULL,
        CONSTRAINT fk_sale_home FOREIGN KEY (homeid) REFERENCES home(id),
        brokerid INT NOT NULL,
        CONSTRAINT fk_sale_broker FOREIGN KEY (brokerid) REFERENCES broker(id)
    )`
    await createTable('sale', createTableQuery)
}

const createUserTable = async function() {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(32) NOT NULL UNIQUE,
        password VARCHAR(256) NOT NULL,
        email VARCHAR(64) NOT NULL UNIQUE
    )`
    await createTable('user', createTableQuery)
}

const createTokenTable = async function() {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS token (
        id INT PRIMARY KEY AUTO_INCREMENT,
        token VARCHAR(256) NOT NULL,
        userId INT NOT NULL,
        CONSTRAINT fk_token_user FOREIGN KEY (userId) REFERENCES user(id)
    )`
    await createTable('token', createTableQuery)
}

const deleteTables = async function () {
    await deleteTable('sale')
    await deleteTable('broker')
    await deleteTable('apartment')
    await deleteTable('house')
    await deleteTable('image')
    await deleteTable('home')
    await deleteTable('user')
    await deleteTable('token')
}

const deleteTable = async function (tableName) {
    try {
        const deleteQuery = `DROP TABLE ${tableName}`
        await homeFinderPoolPromise.query(deleteQuery)
        console.log(`Table ${tableName} deleted`)
    } catch (error) {
        console.log(`Table ${tableName} deletion failed`)
    }
}

module.exports = {
    databasePoolPromise,
    homeFinderPoolPromise,
    //homefinderConnectionInfo,
    createDatabase,
    deleteDatabase,
    createTables,
    deleteTables
}