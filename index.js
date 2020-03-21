const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const client = require('./src/discord-config')
const cron = require('node-cron')

// Imported functions
const getAPIData = require('./src/functions/getAPIData')
const createEmbed = require('./src/functions/createEmbed')
const getCountry = require('./src/functions/getCountry')

let result = ''

getAPIData().then((data) => {
    result = data
})

// New call to API and update to result at the top of every hour
cron.schedule('* 0 * * * *', () => {
    getAPIData().then((data) => {
        result.length = 0
        result = data
    })
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (msg) => {
    if (!msg.content.startsWith('!corona')) {
        return
    }

    const countryIndex = await getCountry(result, msg)
    const resultMessage = await createEmbed(result[countryIndex])

    if (resultMessage === 'embedError') {
        return msg.channel.send('Country not found. See <https://github.com/NathanDennis/Discord-Coronavirus-Stats> for specific search terms')
    }

    console.log(resultMessage)
    msg.channel.send(resultMessage)
})

client.login(TOKEN).then(() => {
    console.log('Coronavirus bot logged in')
}).catch((error) => {
    console.log(error)
})