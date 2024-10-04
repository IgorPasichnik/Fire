import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { changeMonths } from "../../../redux/slices/calc";
import { MAX_MONTHS } from "../../../utils/initCalc";
import { Grid2, Slider, Stack } from "@mui/material";
import InvestmensCharts from "./InvestmensCharts";
import GrowthChart from "../GrowthCharts/GrowthChart";

const PlotsWrapper = () => {
  const months = useAppSelector((store) => store.calculator.months);
  const dispatch = useAppDispatch();

  return (
    <Grid2 container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
      <Grid2 size={6}>
        <InvestmensCharts />
      </Grid2>
      <Grid2 size={6}>
        <GrowthChart />
      </Grid2>
      <Grid2 size={12}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", m: 5 }}
          alignItems="center"
        >
          <Slider
            aria-label="Volume"
            value={months}
            onChange={(_, value) => {
              const newValue = Array.isArray(value) ? value[0] : value;
              if (Number.isNaN(newValue)) return;
              dispatch(changeMonths(newValue));
            }}
            max={MAX_MONTHS}
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: MAX_MONTHS,
                label: `${MAX_MONTHS}`,
              },
              {
                value: months,
                label: `${months}`,
              },
            ]}
          />
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default PlotsWrapper;
