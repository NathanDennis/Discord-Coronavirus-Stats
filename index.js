const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const client = require('./src/discord-config')
const cron = require('node-cron')

const getAPIData = require('./src/functions/getAPIData')
const createEmbed = require('./src/functions/createEmbed')

let result = '' //this

getAPIData().then((data) => {
    result = data //this
})

// New call to API and update to result at the top of every hour
cron.schedule('* 0 * * * *', () => {
    getAPIData().then((data) => {
        result = data
    })
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
    if (!msg.content.startsWith('!corona')) {
        return
    }

    const country = result.find(country => country.name.toUpperCase() === msg.content.slice(8).toUpperCase())
    const findCountry = (element) => element.name === country.name

    if (!country) {
        console.log('Country not found')
        return
    }

    const countryIndex = result.findIndex(findCountry)

    const resultMessage = createEmbed(result[countryIndex])

    msg.channel.send(resultMessage)
})

client.login(TOKEN).then(() => {
    console.log('Coronavirus bot logged in')
}).catch((error) => {
    console.log(error)
})