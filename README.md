# Discord-Coronavirus-Stats

## Data provided by the coronavirus-monitor API at rapidapi.com
Display Coronavirus statistics for any requested country

[Add the bot to your server](https://discordapp.com/api/oauth2/authorize?client_id=690346398151082044&permissions=67584&scope=bot)

![Screenshot of app landing page](https://i.imgur.com/ZAAEWFvl.png)

Results sometimes aren't returned if:
  - The country you requested has no reported cases and therefore isn't in the API dataset
  - There was a typo in the country name
  - The country name is formatted differently in the API data (see below)
  
### Use command !corona (country) for results - message is case insensitive
 
## Requests that may not return results
Some country names aren't formatted as expected in the API dataset

For example, to search for data on South Korea, you need to call !corona S. Korea

Another example - 'America' or 'United States' needs to use the search term 'USA'

Below is a list of countries that need specific search terms

Country Name | Search Term
------------ | ------------
United States of America | USA
South Korea | S. Korea
United Kingdom | UK
Czech Republic | Czechia
United Arab Emirates | UAE
Bosnia | Bosnia and Herzegovina
Réunion | Réunion (needs accent - use alt+1410 for é)
Democratic Republic of the Congo | DRC
Jersey / Guernsey | Channel Islands
Curaçao | Curaçao (needs accent - use alt+0231 for ç)
US Virgin Islands | U.S. Virgin Islands
Caribbean Netherlands | CAR

