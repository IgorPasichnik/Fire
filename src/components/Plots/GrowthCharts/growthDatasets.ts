import { CalculatorT } from "../../../types/calc";

const growthDatasets = (calculator: CalculatorT) => {
  const {
    investments,
    months,
    annualInvestmentRate,
    fixedExpenses,
    inflatingExpenses,
    annualInflationRate,
    income,
    annuaIncomeIncrease,
  } = calculator;

  const totalIncome = income.reduce((acc, entry) => acc + entry.value, 0);
  const monthlyIncome: number[] = [totalIncome];

  const newMonthlyInvestments = investments.reduce(
    (acc, entry) => acc + entry.value,
    0
  );
  const newMonthlyFixed = fixedExpenses.reduce(
    (acc, entry) => acc + entry.value,
    0
  );
  const newMonthlyInflating = inflatingExpenses.reduce(
    (acc, entry) => acc + entry.value,
    0
  );

  const totalInvestedArr: number[] = [newMonthlyInvestments];
  const monthlyGrowth: number[] = [0];
  const monthlyExpenses: number[] = [newMonthlyFixed + newMonthlyInflating];

  const newMonthlyInflatingValue: number[] = [newMonthlyInflating];

  for (let index = 1; index < months; index++) {
    const growth = totalInvestedArr[index - 1] * (annualInvestmentRate / 12);
    monthlyGrowth.push(growth);
    totalInvestedArr.push(
      totalInvestedArr[index - 1] + growth + newMonthlyInvestments
    );

    newMonthlyInflatingValue.push(
      newMonthlyInflatingValue[index - 1] * (1 + annualInflationRate / 12)
    );
    monthlyExpenses.push(newMonthlyFixed + newMonthlyInflatingValue[index]);

    monthlyIncome.push(
      monthlyIncome[index - 1] * (1 + annuaIncomeIncrease / 12)
    );
  }

  return [
    {
      label: "Ежемесячный рост инв.",
      data: monthlyGrowth,
      borderWidth: 1,
    },
    {
      label: "Расходы",
      data: monthlyExpenses,
      borderWidth: 1,
    },
    {
      label: "Зарплата",
      data: monthlyIncome,
      borderWidth: 1,
    },
  ];
};

export default growthDatasets;
