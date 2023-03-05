import { round } from "./helpers.js";

export function calculatePricePerKm(price, kilometersDriven) {
  let pricePerKm = 0;
  if (kilometersDriven <= 100) {
    pricePerKm += price.priceLessThan100Kms * kilometersDriven;
  }
  else if (kilometersDriven > 100 && kilometersDriven <= 200) {
    // First 100km at this price
    pricePerKm += price.priceLessThan100Kms * 100;
    // Rest at this price
    pricePerKm += price.price100To200Kms * (kilometersDriven - 100);
  }
  else if (kilometersDriven > 200) {
    // First 100km at this price
    pricePerKm += price.priceLessThan100Kms * 100;
    // Second 100km at this price
    pricePerKm += price.price100To200Kms * 100;
    // Rest (total - 200km) at this price
    pricePerKm += price.priceMoreThan200Kms * (kilometersDriven - 200);
  }
  return pricePerKm;
}

export function calculatePricePerHours(price, totalHoursDriven) {
  const initPriceHours = price.pricePerHour * totalHoursDriven;
  const totalPriceHours = initPriceHours > price.maxPrice24Hours ? price.maxPrice24Hours : initPriceHours;

  return totalPriceHours;
}

export function calculatePriceFromPriceList(price, totalHoursDriven, totalKmsDriven) {
  const totalPriceHours = round(calculatePricePerHours(price, totalHoursDriven));
  const totalPriceKms = round(calculatePricePerKm(price, totalKmsDriven));

  return {
    name: price.name,
    totalHoursDriven,
    totalKmsDriven,
    totalPriceHours,
    totalPriceKms,
    finalPrice: round(totalPriceHours + totalPriceKms),
  };
}