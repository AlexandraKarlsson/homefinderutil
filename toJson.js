const fs = require('fs')

const convert = function() {
    let contentsAppartment = fs.readFileSync('./data/apartment.txt','utf8')
    let contentsHouse = fs.readFileSync('./data/house.txt','utf8')

    contentsAppartment = contentsAppartment.split('\n')
    contentsHouse = contentsHouse.split('\n')

    let apartments = []
    let houses = []
    let brokers    = []

    let appartment = {}
    let house = {}
    let broker = {}


    // Parse the appartments
    for(let index=0;index<=contentsAppartment.length;index++) {
        let line = contentsAppartment[index]
        //line = line.trim()
        console.log(`${index} line= ${line}`)

        if(line == 'Adress') {
            index=index+1
            appartment.address = contentsAppartment[index]
        } else if (line == 'Beskrivning') {
            index=index+1
            appartment.description = contentsAppartment[index]
        } else if (line == 'Pris') {
            index=index+1
            appartment.price = contentsAppartment[index]
        } else if (line == 'Boarea (kvm)') {
            index=index+1
            appartment.livingSpace = contentsAppartment[index]
        } else if (line == 'Antal rum') {
            index=index+1
            appartment.rooms = contentsAppartment[index]
        } else if (line == 'Lägenhetsnummer') {
            index=index+1
            appartment.apartmentnumber = contentsAppartment[index]
        } else if (line == 'Byggnadsår') {
            index=index+1
            appartment.built = contentsAppartment[index]
        } else if (line == 'Avgift (kr/mån)') {
            index=index+1
            appartment.charge = contentsAppartment[index]
        } else if (line == 'Driftskostnad (kr/mån)') {
            index=index+1
            appartment.operationCost = contentsAppartment[index]
        } else if (line == 'Ansvarig mäklare') {
            index=index+1
            broker.name = contentsAppartment[index]
            index=index+1
            broker.phone = contentsAppartment[index]
            index=index+1
            broker.email = contentsAppartment[index]
        } else if (line == '') {
            apartments.push(appartment)

            if(!brokers.some(item => item.name === broker.name)) {
                brokers.push(broker)
            }
            
            appartment = {}
            broker = {}
        } else {
            console.log('Unknown label ' + line)
        }
    }

    console.log('\n')

    // Parse the houses
    for(let index=0;index<=contentsHouse.length;index++) {
        let line = contentsHouse[index]
        //line = line.trim()
        console.log(`${index} line= ${line}`)

        if(line == 'Adress') {
            index=index+1
            house.address = contentsHouse[index]
        } else if (line == 'Beskrivning') {
            index=index+1
            house.description = contentsHouse[index]
        } else if (line == 'Pris') {
            index=index+1
            house.price = contentsHouse[index]
        } else if (line == 'Boarea (kvm)') {
            index=index+1
            house.livingSpace = contentsHouse[index]
        } else if (line == 'Antal rum') {
            index=index+1
            house.rooms = contentsHouse[index]
        } else if (line == 'Byggnadsår') {
            index=index+1
            house.built = contentsHouse[index]
        } else if (line == 'Fastighetsbeteckning') {
            index=index+1
            house.cadastral = contentsHouse[index]
        } else if (line == 'Byggnadstyp') {
            index=index+1
            house.structure = contentsHouse[index]
        } else if (line == 'Tomtarea (kvm)') {
            index=index+1
            house.plotSize = contentsHouse[index]
        } else if (line == 'Driftskostnad (kr/år)') {
            index=index+1
            house.operationCost = contentsHouse[index]    
        } else if (line == 'Grund') {
            index=index+1
            house.ground = contentsHouse[index]
        } else if (line == 'Ansvarig mäklare') {
            index=index+1
            broker.name = contentsHouse[index]
            index=index+1
            broker.phone = contentsHouse[index]
            index=index+1
            broker.email = contentsHouse[index]
        } else if (line == '') {
            houses.push(house)

            if(!brokers.some(item => item.name === broker.name)) {
                brokers.push(broker)
            }
            house = {}
            broker = {}
        } else {
            console.log('Unknown label ' + line)
        }
    }

    console.log(apartments.length)
    apartments.forEach(element => {
        console.log(element);
    });
    console.log("\n\n")

    console.log(houses.length)
    houses.forEach(element => {
        console.log(element);
    });
    console.log("\n\n")

    console.log(brokers.length)
    brokers.forEach(element => {
        console.log(element)
    })

    let jsonStringApartment = JSON.stringify(apartments, null, 2)
    let jsonStringHouse = JSON.stringify(houses, null, 2)
    let jsonStringBroker = JSON.stringify(brokers, null, 2)

    fs.writeFileSync('./data/apartments.json',jsonStringApartment,'utf8')
    fs.writeFileSync('./data/houses.json',jsonStringHouse,'utf8')
    fs.writeFileSync('./data/brokers.json',jsonStringBroker,'utf8')
}

module.exports = {convert}