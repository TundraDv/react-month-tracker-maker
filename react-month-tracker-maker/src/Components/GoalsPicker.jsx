import React, { useState, useRef, useEffect } from 'react';
import { Stack, Slider, Grid, TextField, IconButton } from '@mui/material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useGoalsContext } from '../Contexts/GoalsContext';
import { useLanguage } from '../Contexts/LanguageContext';

function GoalsPicker() {
  const { textfields, columns, rows, emojis, updateColumns, updateRows, updateTextfields, updateEmojis } = useGoalsContext();
  const [selectedEmojis, setSelectedEmojis] = useState(emojis);
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const { translate } = useLanguage();
  const activeFieldIndexRef = useRef(activeFieldIndex);

  useEffect(() => {
    activeFieldIndexRef.current = activeFieldIndex;
  }, [activeFieldIndex]);

  const handleTextField = (index, event) => {
    setShowEmojiPicker(false); 
    const newTextFields = [...textfields];
    newTextFields[index] = event.target.value;
    updateTextfields(newTextFields);
  };

  const handleColumns = (event, value) => {
    setShowEmojiPicker(false); 
    updateColumns(value);
  };

  const handleRows = (event, value) => {
    setShowEmojiPicker(false); 
    updateRows(value);
  };

  const onEmojiClick = (emoji) => {
    const index = activeFieldIndexRef.current;
    if (index !== null) {
      const newSelectedEmojis = [...selectedEmojis];
      newSelectedEmojis[index] = emoji.native;
      setSelectedEmojis(newSelectedEmojis);
      updateEmojis(newSelectedEmojis);
    }
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (index) => {
    setActiveFieldIndex(index);
    setShowEmojiPicker(true); 
  };

  return (
    <Stack spacing={0}>
      {translate("column-label")}
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
      {translate("row-label")}
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
                value={textfields[index]}
                sx={{'& .MuiInputBase-input': { padding: '10px' }}}
                onChange={(event) => handleTextField(index, event)}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      {showEmojiPicker && (
        <Picker
          data={data}
          onEmojiSelect={onEmojiClick}
        />
      )}
    </Stack>
  );
}

export default GoalsPicker;
