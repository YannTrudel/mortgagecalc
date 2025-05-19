const assert = require('node:assert/strict');
const test = require('node:test');
const { formatCurrency, calculateMonthlyPayment, computeAmortizationSchedule } = require('./calculator.js');

test('calculateMonthlyPayment with interest', () => {
  const payment = calculateMonthlyPayment(100000, 5, 30);
  assert.ok(Math.abs(payment - 536.8216230121398) < 1e-6);
});

test('calculateMonthlyPayment with zero interest', () => {
  const payment = calculateMonthlyPayment(1200, 0, 1);
  assert.strictEqual(payment, 100);
});

test('computeAmortizationSchedule reduces balance to zero', () => {
  const payment = calculateMonthlyPayment(1000, 12, 1);
  const schedule = computeAmortizationSchedule(1000, 12, 1, payment);
  assert.strictEqual(schedule.length, 12);
  const last = schedule[schedule.length - 1];
  assert.ok(Math.abs(last.balance) < 1e-6);
});

test('formatCurrency formatting', () => {
  assert.strictEqual(formatCurrency(1234.5), '$1,234.50');
});
