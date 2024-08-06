import React, { useState, useEffect, useRef } from "react";
import { Stack, Slider, Grid, TextField, IconButton } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import { useGoalsContext } from '../Contexts/GoalsContext';

function GoalsPicker() {
  const { textfields, emojis, updateColumns, updateRows, updateTextfields, updateEmojis } = useGoalsContext();
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(4);
  const [selectedEmojis, setSelectedEmojis] = useState(emojis);
  const [textFields, setTextFields] = useState(textfields);
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 

  const activeFieldIndexRef = useRef(activeFieldIndex);

  useEffect(() => {
    activeFieldIndexRef.current = activeFieldIndex;
  }, [activeFieldIndex]);

  const handleTextField = (index, event) => {
    setShowEmojiPicker(false); 
    const newTextFields = [...textFields];
    newTextFields[index] = event.target.value;
    setTextFields(newTextFields);
    updateTextfields(newTextFields);
  };

  const handleColumns = (event, value) => {
    setShowEmojiPicker(false); 
    setColumns(value);
    updateColumns(value);
  };

  const handleRows = (event, value) => {
    setShowEmojiPicker(false); 
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
    setShowEmojiPicker(true); // Show emoji picker when an emoji icon is clicked
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
      <Grid container rowSpacing={1} sx={{ marginY: 2 }} columnSpacing={{ xs: 1, sm: columns, md: 1 }}>
        {Array.from({ length: rows * columns }, (_, index) => (
          <Grid item key={`grid-item-${index}`} xs={12 / columns}>
            <Stack direction={"row"}>
              <IconButton onClick={() => handleEmojiClick(index)}>
                {selectedEmojis[index]}
              </IconButton>
              <TextField
                id={`outlined-basic-${index}`}
                variant="outlined"
                size="small"
                value={textFields[index]}
                sx = {{'& .MuiInputBase-input': {
                        padding: '10px', 
                      },}}
                onChange={(event) => handleTextField(index, event)}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      {showEmojiPicker && (
        <EmojiPicker
          width="100%"
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: 'absolute', zIndex: 1000 }}
        />
      )}
    </Stack>
  );
}

export default GoalsPicker;
