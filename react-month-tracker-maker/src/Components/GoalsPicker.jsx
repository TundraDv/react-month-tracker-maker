import React, { useState } from "react";
import { Stack, Slider, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import { EmojiEmotions } from '@mui/icons-material';
import { useGoalsContext } from '../Contexts/GoalsContext';

function GoalsPicker() {
  const { updateColumns, updateRows, updateTextfields, updateEmojis } = useGoalsContext();
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(4);
  const [selectedEmojis, setSelectedEmojis] = useState(Array(rows * columns).fill('❤️'));
  const [textFields, setTextFields] = useState(Array(rows * columns).fill(''));
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);

  const handleTextField = (index, event) => {
    console.log('Updating TextField:', index, event.target.value);
    const newTextFields = [...textFields];
    newTextFields[index] = event.target.value;
    setTextFields(newTextFields);
    updateTextfields(newTextFields);
  };

  const handleColumns = (event, newValue) => {
    console.log('Updating Columns:', newValue);
    const validColumns = Math.max(1, newValue); // Ensure at least 1 column
    setColumns(validColumns);
    updateColumns(validColumns);
    setTextFields(Array(rows * validColumns).fill(''));
    setSelectedEmojis(Array(rows * validColumns).fill('❤️'));
  };

  const handleRows = (event, newValue) => {
    console.log('Updating Rows:', newValue);
    const validRows = Math.max(0, newValue); // Ensure non-negative value
    setRows(validRows);
    updateRows(validRows);
    setTextFields(Array(validRows * columns).fill(''));
    setSelectedEmojis(Array(validRows * columns).fill('❤️'));
  };

  const onEmojiClick = (emojiObject) => {
    if (activeFieldIndex !== null) {
      console.log('Updating Emoji:', activeFieldIndex, emojiObject.emoji);
      const newSelectedEmojis = [...selectedEmojis];
      newSelectedEmojis[activeFieldIndex] = emojiObject.emoji;
      setSelectedEmojis(newSelectedEmojis);
      setActiveFieldIndex(null);
      updateEmojis(newSelectedEmojis);
    }
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
        aria-label="Goals per column"
        value={rows}
        step={1}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
        onChange={handleRows}
      />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: columns, md: 3 }}>
        {Array.from({ length: rows * columns }, (_, index) => (
          <Grid item key={`grid-item-${index}`} xs={12 / columns}>
            <TextField
              id={`outlined-basic-${index}`}
              variant="standard"
              value={textFields[index] || `${index + 1}K Steps`}
              onChange={(event) => handleTextField(index, event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setActiveFieldIndex(index)}>
                      {selectedEmojis[index]}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        ))}
      </Grid>
      <EmojiPicker
        width="100%"
        onEmojiClick={(emojiObject) => onEmojiClick(emojiObject)}
        pickerStyle={{ position: 'absolute', zIndex: 1000 }}
      />
    </Stack>
  );
}

export default GoalsPicker;
