import { Container, Grid2, Typography } from "@mui/material";
import { CATEGORIES_WITH_TEXT } from "./types/calc";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";
import { useAppSelector } from "./redux/hook";
import AddEntryModal from "./components/AddEntryModal/AddEntryModal";
import PlotsWrapper from "./components/Plots/InvesmentsCharts/PlotsWrapper";

function App() {
  const entry = useAppSelector((store) => store.calculator.remaining);

  return (
    <Container>
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">F.I.R.E</Typography>
        <Grid2 size={12}>
          <PlotsWrapper />
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {CATEGORIES_WITH_TEXT.map((category) => (
          <Grid2 key={category.value} size={{ xs: 2, sm: 4, md: 4 }}>
            <CategoryColumn category={category.value} text={category.text} />
          </Grid2>
        ))}
        <Grid2 key="remaining" size={{ xs: 2, sm: 4, md: 4 }}>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            container
          >
            <Grid2 key="category remaining" size={{ xs: 12 }}>
              <Typography variant="h5">Остаток</Typography>
            </Grid2>
            <Grid2 key={entry.id} size={{ xs: 12 }}>
              {/* <Entry entry={entry} /> */}
              <Typography
                sx={{
                  marginTop: "4px",
                  display: "flex",
                }}
                variant="subtitle1"
              >
                {entry.value.toString()}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
      <AddEntryModal />
    </Container>
  );
}

export default App;
