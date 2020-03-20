const client = require('./src/discord-config')
const dotenv = require('dotenv')
const { MessageEmbed } = require('discord.js')
dotenv.config()
const { TOKEN, APIKEY } = process.env

// API SETUP
const unirest = require('unirest')
const req = unirest('GET', 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php')

req.headers({
	'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
	'x-rapidapi-key': APIKEY
})

const getAPIData = () => {
    return promise = new Promise((resolve, reject) => {
        req.end((res) => {
            if (res.error) {
                console.log(res.error)
            }

            let parsed = JSON.parse(res.body)
            let countriesArray = parsed.countries_stat

            let countryData = countriesArray.map(country => ({
                name: country.country_name,
                totalCases: country.cases,
                deaths: country.deaths,
                totalRecovered: country.total_recovered,
                critical: country.serious_critical,
                activeCases: country.active_cases,
                casesPerMillion: country.total_cases_per_1m_population
            }))
            resolve(countryData)
        })
    })
}

let result = '' 
let commandParams = []

getAPIData().then((data) => {
    result = data

    result.forEach((country) => {
        commandParams.push(country.name)
    })
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
    let countryName = commandParams.find(key => key.toUpperCase() === msg.content.slice(8).toUpperCase())

    if (!msg.content.startsWith('!corona')) {
        return
    }

    if (!countryName) {
        console.log('Country not found')
        return
    }

    const findCountry = (element) => element.name === countryName
    const countryIndex = result.findIndex(findCountry)

    let { name, totalCases, deaths, totalRecovered, critical, activeCases, casesPerMillion } = result[countryIndex]

    const resultEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${name}`)
        .setURL('https://ncov2019.live/')
        .setAuthor('Coronavirus Statistics')
        .setDescription(`Current Coronavirus stats for ${name}`)
        .setThumbnail('https://i.imgur.com/LkMGsKV.png')
        .addFields(
            {name: 'Total cases', value: `${totalCases}`},
            {name: 'Deaths', value: `${deaths}`},
            {name: 'Total recovered', value: `${totalRecovered}`},
            {name: 'Serious condition', value: `${critical}`},
            {name: 'Active cases', value: `${activeCases}`},
            {name: 'Cases per 1 million people', value: `${casesPerMillion}`},
        )
        .setTimestamp()
        .setFooter('Wash your hands, stay safe, avoid non-essential outings')

    let lowerMessage = msg.content.toLowerCase()
    let countryNameLower = countryName.toLowerCase()
    
    if (lowerMessage.startsWith('!corona') && lowerMessage.includes(countryNameLower)) {
        console.log('Message should send')
        msg.channel.send(resultEmbed)
    }
})

client.login(TOKEN).then(() => {
    console.log('Coronavirus bot logged in')
}).catch((error) => {
    console.log(error)
})