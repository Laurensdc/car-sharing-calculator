# Project

It's a CLI application. 

Run with
```npm run start```

It compares prices if you're a member of both Cambio and Degage's car sharing systems and gives you the best option.

It also estimates how much your ride will cost.

Example output:
```
$ npm run start

> autodelen@1.0.0 start
> node src/index.js

Hoeveel km ga je rijden in totaal (heen en terug)? 90
Hoeveel uren ga je de auto gebruiken in totaal? 6

Cambio Bonus - Klasse S
€36.9
Details: €11.7 voor 6 uur + €25.2 voor 90km

Degage - Klasse B
€39.6
Details: €0 voor 6 uur + €39.6 voor 90km

Cambio Bonus - Klasse M
€39.9
Details: €13.8 voor 6 uur + €26.1 voor 90km

Cambio Bonus - Klasse L
€47.7
Details: €16.2 voor 6 uur + €31.5 voor 90km

Cambio Bonus - Klasse XL
€59.4
Details: €23.4 voor 6 uur + €36 voor 90km

-------------------------------------------------------

Goedkoopste klasse:

Degage - Klasse A
€32.4
Details: €0 voor 6 uur + €32.4 voor 90km
```


## To know

- Prices are hard coded in `priceDetails.json`, update this manually
- Dutch only for now


## Future 

- Scrape prices from the live websites
- GUI application
- Host it somewhere
- Multilingual

