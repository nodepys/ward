const { initializeDB, queryParams } = require("./db/db");
const { initializeController } = require("./mainbot/controllerbot");
const initializeBots = require("./mainbot/handlers/initializeBots");

initializeController().then(() => { console.log(`Initialized Controller!`) })
initializeDB().then(() => {
    console.log(`Initialized DB`)
    initializeBots().then(() => {
        console.log(`Initialized Bots`)
    })
})