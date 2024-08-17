import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material"

function Goals( {goalsSettings} ) {
  const { columns,
    rows, 
    textfields,
    emojis,
    goalsSelectedFonts,
    goalsSelectedColors,
    goalsBoldSettings,
    goalsItalicSettings,
    goalsFontSizes } = goalsSettings;

  const totalItems = rows * columns;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: 1 }}>
      <Box
      sx={{
        marginX: 1.5,
        width: "100%",
        // borderRadius: 4,
        // border: '10px groove  rgba(0, 0, 0, 0.5);',
        // borderColor: "#84DF9B",
        // backgroundColor: "#fff"
      }}
    >
      <Grid container spacing={0.7} justifyContent="center" alignItems="center">
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
                <Typography 
                sx={{ 
                  position: 'relative',
                  // display: 'inline-block',
                  // color: 'white',
                  // textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
                  fontFamily: goalsSelectedFonts, 
                  color: goalsSelectedColors,
                  fontWeight: goalsBoldSettings ? 'bold' : 'normal',
                  fontStyle: goalsItalicSettings ? 'italic' : 'normal',
                  fontSize: goalsFontSizes,
                  textAlign: 'left'
                  }}>
                  {textfields[index]}
                </Typography>
              </Stack>
            ) : null}
          </Grid>
        ))}
      </Grid>
        </Box>
    </Box>
  );
}

export default Goals;