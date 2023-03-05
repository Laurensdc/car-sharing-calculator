import chalk from 'chalk';

const eur = `\u20AC`;

function printPriceLine(price) {
  console.log(`${chalk.green(price.name)}\n${chalk.magenta(eur + price.finalPrice)}\nDetails: ${eur}${price.totalPriceHours} voor ${price.totalHoursDriven} uur + ${eur}${price.totalPriceKms} voor ${price.totalKmsDriven}km\n`);
}
export function logBestPriceAndInfo(bestPrices) {
  const sortedPrices = bestPrices.sort((a, b) => a.finalPrice - b.finalPrice);

  console.log();

  for (let i = 1; i < sortedPrices.length; i++) {
    printPriceLine(sortedPrices[i]);
  }

  console.log(chalk.yellow('-------------------------------------------------------'));
  console.log();
  console.log(chalk.grey('Goedkoopste klasse:'));
  console.log();
  printPriceLine(sortedPrices[0]);
}
