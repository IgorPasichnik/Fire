import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Chart } from "chart.js/auto";
import growthDatasets from "./GrowthDatasets";

const GrowthChart = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const calculator = useAppSelector((store) => store.calculator);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: new Array(calculator.months).fill(null).map((_, i) => `${i}`),
        datasets: growthDatasets(calculator),
      },
    });
    return () => chart.destroy();
  }, [calculator]);

  return (
    <canvas
      ref={canvasRef}
      id="investmens-chart"
      width="400"
      height="400"
    ></canvas>
  );
};

export default GrowthChart;
