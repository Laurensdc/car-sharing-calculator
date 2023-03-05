import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { readFileSync } from 'node:fs';
import { logBestPriceAndInfo } from './logBestPriceAndInfo.js';
import { calculatePriceFromPriceList, calculatePricePerHours, calculatePricePerKm } from './priceCalculation.js';

// Main program
await main();

async function main() {
  const { totalKmsDriven, totalHoursDriven } = await readInput();
  const priceList = getPriceList();
  const bestPrices = getPricesForEveryCar(priceList, totalHoursDriven, totalKmsDriven);
  logBestPriceAndInfo(bestPrices);
}

function getPriceList() {
  const priceList = readFileSync('./priceDetails.json', 'utf-8');
  const priceListJson = JSON.parse(priceList);
  return priceListJson;
}

async function readInput() {
  const rl = readline.createInterface({ input, output, terminal: false });
  const totalKmsDriven = Number(await rl.question('Hoeveel km ga je rijden in totaal (heen en terug)? '));
  const totalHoursDriven = Number(await rl.question('Hoeveel uren ga je de auto gebruiken in totaal? '));
  rl.close();

  return { totalKmsDriven, totalHoursDriven };
}

function getPricesForEveryCar(priceList, totalHoursDriven, totalKmsDriven) {
  const combinedInfo = [];

  for (const price of priceList) {
    combinedInfo.push(calculatePriceFromPriceList(price, totalHoursDriven, totalKmsDriven));
  }

  return combinedInfo;
}


