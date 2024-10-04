import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { closeModal } from "../../redux/slices/modal";
import { useState } from "react";
import { addEntry } from "../../redux/slices/calc";
import { CATEGORIES_WITH_TEXT } from "../../types/calc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const AddEntryModal = () => {
  const [value, setValue] = useState("");
  const { open, category } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const currentCategory = CATEGORIES_WITH_TEXT.find(
    (cat) => cat.value === category
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addEntry({ category, type: value }));
            dispatch(closeModal());
            setValue("");
          }}
        >
          {currentCategory && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Добавить в категорию {currentCategory.text.toLowerCase()}
            </Typography>
          )}
          <TextField
            id="outlined-basic"
            label="Укажите название"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoFocus
          />
          <Button type="submit" variant="outlined">
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEntryModal;
