import { Grid2, IconButton, Typography } from "@mui/material";
import { CategoryT } from "../../types/calc";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Entry from "../Entry/Entry";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { openModal } from "../../redux/slices/modal";

type CategoryColumnProps = {
  category: CategoryT;
  text: string;
};

const CategoryColumn = ({ category, text }: CategoryColumnProps) => {
  const entries = useAppSelector((store) => store.calculator[category]);
  const dispatch = useAppDispatch();

  return (
    <Grid2 container>
      <Grid2
        key={`category ${category}`}
        size={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h5">{text}</Typography>
      </Grid2>
      {entries.map((entry) => (
        <Grid2
          sx={{
            marginBottom: "10px",
            marginTop: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={entry.id}
          size={12}
        >
          <Entry entry={entry} />
        </Grid2>
      ))}
      <Grid2
        key={`add ${category}`}
        size={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => dispatch(openModal(category))}
          edge="end"
        >
          <AddCircleIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};

export default CategoryColumn;
