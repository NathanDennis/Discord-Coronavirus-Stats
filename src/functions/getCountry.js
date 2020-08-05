const getCountry = (countryArray, msg) => {
    const country = countryArray.find(country => country.name.toUpperCase() === msg.content.slice(7).toUpperCase())
    const findCountry = (element) => element.name === country.name

    if (!country) {
        console.log('Country not found')
        return
    }

    const countryIndex = countryArray.findIndex(findCountry)

    return countryIndex
}

module.exports = getCountry
