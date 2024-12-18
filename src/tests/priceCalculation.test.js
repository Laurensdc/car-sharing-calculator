import { test } from "uvu";
import * as assert from "uvu/assert";

import {
  calculatePriceFromPriceList,
  calculatePricePerHours,
  calculatePricePerKm,
} from "../priceCalculation.js";
import { round } from "../helpers.js";

const degage = {
  name: "Degage - Klasse A",
  pricePerHour: 0,
  maxPrice24Hours: 0,
  priceLessThan100Kms: 0.36,
  price100To200Kms: 0.32,
  priceMoreThan200Kms: 0.28,
};

const cambio = {
  name: "Cambio Bonus - Klasse S",
  pricePerHour: 1.95,
  maxPrice24Hours: 23,
  priceLessThan100Kms: 0.28,
  price100To200Kms: 0.24,
  priceMoreThan200Kms: 0.24,
};

test("calculatePricePerKm - degage", () => {
  assert.is(calculatePricePerKm(degage, 0), 0); // Test 0 value
  assert.is(calculatePricePerKm(degage, 5), 0.36 * 5); // Test price <100km
  assert.is(calculatePricePerKm(degage, 100), 0.36 * 100); // Edge case for 100km exactly
  assert.is(calculatePricePerKm(degage, 120), 0.36 * 100 + 0.32 * 20); // >100km , <200km
  assert.is(calculatePricePerKm(degage, 200), 0.36 * 100 + 0.32 * 100); // Edge case for 200km exactly
  assert.is(
    calculatePricePerKm(degage, 500),
    // 0.36 for first 100km, 0.32 euro voor next 100km
    // 0.28 km remaining of the 500km
    0.36 * 100 + 0.32 * 100 + 0.28 * 300,
  );
});

test("calculatePricePerKm - cambio", () => {
  assert.is(round(calculatePricePerKm(cambio, 5)), 1.4);
  assert.is(round(calculatePricePerKm(cambio, 50)), 14);
  assert.is(round(calculatePricePerKm(cambio, 120)), 28 + 4.8);
  assert.is(round(calculatePricePerKm(cambio, 250)), 28 + 36);
});

test("calculatePricePerHour - degage", () => {
  assert.is(round(calculatePricePerHours(degage, 0.5)), 0);
  assert.is(round(calculatePricePerHours(degage, 1)), 0);
  assert.is(round(calculatePricePerHours(degage, 10)), 0);
  assert.is(round(calculatePricePerHours(degage, 15)), 0);
  assert.is(round(calculatePricePerHours(degage, 24)), 0);
  assert.is(round(calculatePricePerHours(degage, 48)), 0);
});

test("calculatePricePerHour - cambio", () => {
  assert.is(round(calculatePricePerHours(cambio, 0.5)), 0.98);
  assert.is(round(calculatePricePerHours(cambio, 1)), 1.95);
  assert.is(round(calculatePricePerHours(cambio, 10)), 19.5);
  assert.is(round(calculatePricePerHours(cambio, 15)), 23);
  assert.is(round(calculatePricePerHours(cambio, 24)), 23);
  assert.is(round(calculatePricePerHours(cambio, 48)), 23);
});

test("calculatePriceFromPriceList - degage", () => {
  assert.is(calculatePriceFromPriceList(degage, 10, 120).finalPrice, 42.4);
  assert.is(calculatePriceFromPriceList(degage, 20, 250).finalPrice, 82);
  assert.is(calculatePriceFromPriceList(degage, 1, 250).finalPrice, 82);
});

test("calculatePriceFromPriceList - cambio", () => {
  assert.is(calculatePriceFromPriceList(cambio, 1, 10).finalPrice, 4.75);
  assert.is(calculatePriceFromPriceList(cambio, 5, 15).finalPrice, 13.95);
  assert.is(calculatePriceFromPriceList(cambio, 10, 2).finalPrice, 20.06);
  assert.is(calculatePriceFromPriceList(cambio, 20, 100).finalPrice, 28 + 23);
  assert.is(
    calculatePriceFromPriceList(cambio, 20, 200).finalPrice,
    28 + 24 + 23,
  );
});

test.run();
