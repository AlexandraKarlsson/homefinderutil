const fs = require('fs')
const mysql = require('mysql')

const {homeFinderPoolPromise} = require('./database')

const convert = async function() {
    try {
        // HANDLE BROKER
        // Read brokers from JSON file
        const contentBrokers = fs.readFileSync('./data/brokers.json', 'utf8')
        // console.log(contentBrokers)
        const brokers = JSON.parse(contentBrokers)
        console.log(brokers)

        // Loop through brokers and insert into table broker
        for(let index=0;index<brokers.length;index++) {
            const broker = brokers[index]
            console.log(broker)
            const sqlStatement = `INSERT INTO broker(name,phone,email) VALUES('${broker.name}', '${broker.phone}', '${broker.email}')`
            console.log(sqlStatement)
            await homeFinderPoolPromise.query(sqlStatement)
        }

        // HANDLE APARTMENTS
        // Read apartments from JSON file
        const contentApartments = fs.readFileSync('./data/apartments.json', 'utf8')
        //console.log(contentApartments)
        const apartments = JSON.parse(contentApartments)
        console.log(apartments)
        
        // Loop through apartments and insert into tables home and apartment
        for(let index=0;index<apartments.length;index++) {
            const apartmentData = apartments[index]
            console.log(apartmentData)

            const home = { 
                address:       apartmentData.address,
                description:   apartmentData.description,
                livingspace:   apartmentData.livingSpace,
                rooms:         apartmentData.rooms,
                built:         apartmentData.built,
                operationcost: apartmentData.operationCost
            }
            console.log(`Home: ${home}`)

            const result = await homeFinderPoolPromise.query('INSERT INTO home SET ?', home)
            console.log(result)
            console.log(result[0].insertId)
            const apartment = {
                apartmentnumber: apartmentData.apartmentnumber,
                charge: apartmentData.charge,
                homeid: result[0].insertId
            }
            console.log(`Apartment: ${apartment}`)

            await homeFinderPoolPromise.query('INSERT INTO apartment SET ?', apartment)
        }

        // HANDLE HOUSES
        // Read houses from JSON file
        const contentHouses = fs.readFileSync('./data/houses.json', 'utf8')
        //console.log(contentApartments)
        const houses = JSON.parse(contentHouses)
        console.log(houses)
        
        // Loop through apartments and insert into tables home and apartment
        for(let index=0;index<houses.length;index++) {
            const houseData = houses[index]
            console.log(houseData)

            const home = { 
                address:       houseData.address,
                description:   houseData.description,
                livingspace:   houseData.livingSpace,
                rooms:         houseData.rooms,
                built:         houseData.built,
                operationcost: houseData.operationCost
            }
            console.log(`Home: ${home}`)

            const result = await homeFinderPoolPromise.query('INSERT INTO home SET ?', home)
            console.log(result)
            console.log(result[0].insertId)
            const house = {
                cadastral: houseData.cadastral,
                structure: houseData.structure,
                plotSize: houseData.plotSize,
                ground: houseData.ground,
                homeid: result[0].insertId
            }
            console.log(`House: ${house}`)

            await homeFinderPoolPromise.query('INSERT INTO house SET ?', house)
        }

        // HANDLE IMAGES
        // Read houses from JSON file
        const contentImages = fs.readFileSync('./data/images.json', 'utf8')
        //console.log(contentApartments)
        const images = JSON.parse(contentImages)
        console.log(images)
        
        // Loop through apartments and insert into tables home and apartment
        for(let index=0;index<images.length;index++) {
            const imageData = images[index]
            console.log(imageData)

            const image = { 
                imagename:     imageData.imagename,
                homeid:        imageData.homeid
            }
            console.log(`Image: ${image}`)

            const result = await homeFinderPoolPromise.query('INSERT INTO image SET ?', image)
            console.log(result)
        }

        // HANDLE SALES
        // Read houses from JSON file
        const contentSales = fs.readFileSync('./data/sales.json', 'utf8')
        const sales = JSON.parse(contentSales)
        console.log(sales)
        
        // Loop through apartments and insert into tables home and apartment
        for(let index=0;index<sales.length;index++) {
            const saleData = sales[index]
            console.log(saleData)

            const sale = { 
                date:          saleData.date,
                price:         saleData.price,
                homeid:        saleData.homeid,
                brokerid:      saleData.brokerid
            }
            console.log(`Sale: ${sale}`)

            const result = await homeFinderPoolPromise.query('INSERT INTO sale SET ?', sale)
            console.log(result)
        }
    } catch (error) {
        console.log(error)
    }   
}

module.exports = {convert}
// Happy coding =)