import { IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { EntryT } from "../../types/calc";
import { useAppDispatch } from "../../redux/hook";
import { changeEntryValue, deleteEntry } from "../../redux/slices/calc";

type EntryProps = {
  entry: EntryT;
};

const Entry = ({ entry }: EntryProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <InputLabel htmlFor="input-with-icon-adornment">{entry.type}</InputLabel>
      <Input
        id="input-with-icon-adornment"
        value={entry.value}
        name={entry.name}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          if (Number.isNaN(newValue)) return;
          dispatch(changeEntryValue({ ...entry, value: newValue }));
        }}
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => dispatch(deleteEntry(entry.id))}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default Entry;
