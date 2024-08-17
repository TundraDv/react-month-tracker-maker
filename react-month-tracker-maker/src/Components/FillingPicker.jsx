import React from "react";
import dayjs from "dayjs";
import { useLanguage } from "../Contexts/LanguageContext";
import { Select, Slider, FormControl, Box, Grid, MenuItem, Typography } from "@mui/material";
import { useGoalsContext } from "../Contexts/GoalsContext";
import { useComponentsContext } from "../Contexts/ComponentsContext";

function FillingPicker() {
  const { translate } = useLanguage();
  const { textfields, emojis, fillingEmojis, updateFillingEmojis, emojiSize, updateEmojiSize } = useGoalsContext();
  const { dateValueContext } = useComponentsContext();

  const daysInMonth = dayjs(dateValueContext).daysInMonth();

  const handleChangeSelect = (event, index) => {
    const newFillingEmojis = [...fillingEmojis];
    newFillingEmojis[index] = event.target.value || ''; // Ensure no null value is set
    updateFillingEmojis(newFillingEmojis);
  };

  const handleEmojiSize = (event, newValue) => {
    updateEmojiSize(newValue);
  };

  return (
    <Box>
      <Typography>
        {translate("filling-emojiSize")}
      </Typography>
      <Slider
        aria-label="EmojiSize"
        value={emojiSize}
        step={1}
        marks
        min={15}
        max={30}
        valueLabelDisplay="auto"
        onChange={handleEmojiSize}
      />
      <Typography>
        {translate("filling-label")}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {Array.from({ length: daysInMonth }, (_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box display="flex" alignItems="center">
              <Typography sx={{ width: "30%", pr: 1 }}>
                {translate("filling-day")}{' '}{index + 1}
              </Typography>
              <FormControl sx={{ width: "100%" }} size="small">
                <Select
                  labelId={`goald-select-label-${index}`}
                  id={`demo-simple-select-${index}`}
                  value={fillingEmojis[index] || ''} // Ensure value is not null
                  label="Emoji"
                  size="small"
                  onChange={(event) => handleChangeSelect(event, index)}
                >
                  <MenuItem value="">
                    <em>{translate("filling-none")}</em>
                  </MenuItem>
                  {emojis.map((emoji, emojiIndex) =>
                    textfields[emojiIndex] !== "" ? (
                      <MenuItem key={emojiIndex} value={emoji}>
                        {emoji} {textfields[emojiIndex]}
                      </MenuItem>
                    ) : null
                  )}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FillingPicker;
