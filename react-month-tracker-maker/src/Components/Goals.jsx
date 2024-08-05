import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material"
import { useGoalsContext } from '../Contexts/GoalsContext';

function Goals() {
  const { columns, rows, textfields, emojis } = useGoalsContext();
  const totalItems = rows * columns;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: 2 }}>
      <Grid container spacing={0.7} direction="row">
        {Array.from({ length: totalItems }).map((_, index) => (
          <Grid item xs={12 / columns} key={index}>
            {/[^\s]/.test(textfields[index]) ? (
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: '100%' }}
              >
                <span style={{ 
                  fontFamily: 'Noto Color Emoji, Apple Color Emoji, Segoe UI Emoji, sans-serif',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}>
                  {emojis[index]}
                </span>
                <Typography sx={{ fontSize: '0.8rem' }}>
                  {textfields[index]}
                </Typography>
              </Stack>
            ) : null}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Goals;