import { CalculatorT } from "../../../types/calc";

const investmensDatasets = (calculator: CalculatorT) => {
  const { investments, months, annualInvestmentRate } = calculator;
  const newMonthlyInvestments = investments.reduce(
    (acc, entry) => acc + entry.value,
    0
  );

  const totalInvestedArr: number[] = [newMonthlyInvestments];

  const noInvestmensGain: number[] = [newMonthlyInvestments];

  for (let index = 1; index < months; index++) {
    const growth = totalInvestedArr[index - 1] * (annualInvestmentRate / 12);
    totalInvestedArr.push(
      totalInvestedArr[index - 1] + growth + newMonthlyInvestments
    );
    noInvestmensGain.push(noInvestmensGain[index - 1] + newMonthlyInvestments);
  }

  return [
    {
      label: "Суммарные инвестиции",
      data: totalInvestedArr,

      borderWidth: 1,
    },
    {
      label: "Без роста процентов",
      data: noInvestmensGain,

      borderWidth: 1,
    },
  ];
};

export default investmensDatasets;
