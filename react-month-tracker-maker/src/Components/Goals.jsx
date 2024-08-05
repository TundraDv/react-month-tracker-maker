import React from "react";
import { Grid, Stack, Typography } from "@mui/material"
import * as emoji from 'node-emoji'
import { useGoalsContext } from '../Contexts/GoalsContext';

function Goals() {
  const { columns, rows, textfields, emojis } = useGoalsContext();

  // Calculate the total number of items
  const totalItems = rows * columns;

  // Fill any missing emojis or textfields with default values if necessary
  const filledTextFields = [...textfields, ...Array(totalItems - textfields.length).fill('')];
  const filledEmojis = [...emojis, ...Array(totalItems - emojis.length).fill('❤️')];

  return (
    <Grid container spacing={1} direction="row">
      {Array.from({ length: totalItems }).map((_, index) => (
        <Grid item xs={12 / columns} key={index}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <span style={{ fontFamily: 'Noto Color Emoji, Apple Color Emoji, Segoe UI Emoji, sans-serif' }}>
              {filledEmojis[index]}
            </span>
            <Typography variant="body1">
              {filledTextFields[index]}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default Goals;