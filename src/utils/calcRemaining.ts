import { CalculatorT } from "../types/calc";

const calcRemaining = (calculator: CalculatorT): number => {
  const { income, inflatingExpenses, fixedExpenses, investments, savings } =
    calculator;

  return (
    income.reduce((acc, entry) => acc + entry.value, 0) -
    inflatingExpenses.reduce((acc, entry) => acc + entry.value, 0) -
    fixedExpenses.reduce((acc, entry) => acc + entry.value, 0) -
    investments.reduce((acc, entry) => acc + entry.value, 0) -
    savings.reduce((acc, entry) => acc + entry.value, 0)
  );
};

export default calcRemaining;
