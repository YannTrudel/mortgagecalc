function formatCurrency(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const n = years * 12;
  if (annualRate === 0) {
    return principal / n;
  }
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function computeAmortizationSchedule(principal, annualRate, years, monthlyPayment) {
  const schedule = [];
  const n = years * 12;
  const r = annualRate / 100 / 12;
  let balance = principal;
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let principalPayment = monthlyPayment - interest;
    balance -= principalPayment;
    if (balance < 0) {
      principalPayment += balance;
      balance = 0;
    }
    schedule.push({
      paymentNumber: i,
      payment: monthlyPayment,
      interest: interest,
      principal: principalPayment,
      balance: balance
    });
    if (balance <= 0) break;
  }
  return schedule;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    calculateMonthlyPayment,
    computeAmortizationSchedule,
  };
} else {
  window.formatCurrency = formatCurrency;
  window.calculateMonthlyPayment = calculateMonthlyPayment;
  window.computeAmortizationSchedule = computeAmortizationSchedule;
}
