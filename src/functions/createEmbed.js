const { MessageEmbed } = require('discord.js')

const createEmbed = (country) => {

    if (country === undefined) {
        return 'embedError'
    }
    
    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${country.name}`)
    .setURL('https://ncov2019.live/')
    .setAuthor('Coronavirus Statistics')
    .setDescription(`Current Coronavirus stats for ${country.name}`)
    .setThumbnail('https://i.imgur.com/LkMGsKV.png')
    .addFields(
        {name: 'Total cases', value: `${country.totalCases}`},
        {name: 'Deaths', value: `${country.deaths}`},
        {name: 'Total recovered', value: `${country.totalRecovered}`},
        {name: 'Serious condition', value: `${country.critical}`},
        {name: 'Active cases', value: `${country.activeCases}`},
        {name: 'Cases per 1 million people', value: `${country.casesPerMillion}`},
    )
    .setFooter('Wash your hands, stay safe, avoid non-essential outings')

    return embed
    
}

module.exports = createEmbed