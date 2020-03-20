const dotenv = require('dotenv')
dotenv.config()
const { APIKEY } = process.env

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
                throw new Error (`Error: ${error.message}`)
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

module.exports = getAPIData