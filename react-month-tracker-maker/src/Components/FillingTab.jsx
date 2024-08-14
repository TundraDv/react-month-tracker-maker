import React, { useState } from "react";
import dayjs from "dayjs";
import { useLanguage } from "../Contexts/LanguageContext";
import { Select, FormControl, Box, Grid, MenuItem, Typography } from "@mui/material";
import { useGoalsContext } from "../Contexts/GoalsContext";
import { useComponentsContext } from "../Contexts/ComponentsContext";

function FillingTab() {
  const { translate } = useLanguage();
  const { textfields, emojis, fillingEmojis, updateFillingEmojis } = useGoalsContext();
  const { dateValueContext } = useComponentsContext();

  const daysInMonth = dayjs(dateValueContext).daysInMonth();

  const handleChangeSelect = (event, index) => {
    const newFillingEmojis = [...fillingEmojis];
    newFillingEmojis[index] = event.target.value;
    updateFillingEmojis(newFillingEmojis);
  };

  return (
    <Box>
      <Grid container spacing={2}>
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
                  value={fillingEmojis[index]}
                  label="Emoji"
                  size="small"
                  onChange={(event) => handleChangeSelect(event, index)}
                >
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

export default FillingTab;
