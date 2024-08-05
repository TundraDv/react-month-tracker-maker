import React, { useState, useEffect, useRef } from "react";
import { Stack, Slider, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import { useGoalsContext } from '../Contexts/GoalsContext';

function GoalsPicker() {
  const { updateColumns, updateRows, updateTextfields, updateEmojis } = useGoalsContext();
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(4);
  const [selectedEmojis, setSelectedEmojis] = useState(Array(24).fill('❤️'));
  const [textFields, setTextFields] = useState(Array(24).fill(null).map((_, index) => `${index + 1}K Steps`));
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);

  const activeFieldIndexRef = useRef(activeFieldIndex);

  useEffect(() => {
    // Update the ref when activeFieldIndex changes
    activeFieldIndexRef.current = activeFieldIndex;
  }, [activeFieldIndex]);

  const handleTextField = (index, event) => {
    const newTextFields = [...textFields];
    newTextFields[index] = event.target.value;
    setTextFields(newTextFields);
    updateTextfields(newTextFields);
  };

  const handleColumns = (event, value) => {
    setColumns(value);
    updateColumns(value);
  };

  const handleRows = (event, value) => {
    setRows(value);
    updateRows(value);
  };

  const onEmojiClick = (emojiObject) => {
    const index = activeFieldIndexRef.current;
    if (index !== null) {
      const newSelectedEmojis = [...selectedEmojis];
      newSelectedEmojis[index] = emojiObject.emoji;
      setSelectedEmojis(newSelectedEmojis);
      updateEmojis(newSelectedEmojis);
    }
  };

  const handleEmojiClick = (index) => {
    setActiveFieldIndex(index);
  };

  return (
    <Stack spacing={0}>
      Columns
      <Slider
        aria-label="Columns"
        value={columns}
        step={1}
        marks
        min={1}
        max={4}
        valueLabelDisplay="auto"
        onChange={handleColumns}
      />
      Rows
      <Slider
        aria-label="Rows"
        value={rows}
        step={1}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
        onChange={handleRows}
      />
      <Grid container rowSpacing={1} sx={{ marginY: 2 }} columnSpacing={{ xs: 1, sm: columns, md: 3 }}>
        {Array.from({ length: rows * columns }, (_, index) => (
          <Grid item key={`grid-item-${index}`} xs={12 / columns}>
            <TextField
              id={`outlined-basic-${index}`}
              variant="outlined"
              size="small"
              value={textFields[index]}
              onChange={(event) => handleTextField(index, event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleEmojiClick(index)}>
                      {selectedEmojis[index]}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        ))}
      </Grid>
      {rows > 0 ? (
        <EmojiPicker
          width="100%"
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: 'absolute', zIndex: 1000 }}
        />
      ) : null}
    </Stack>
  );
}

export default GoalsPicker;
