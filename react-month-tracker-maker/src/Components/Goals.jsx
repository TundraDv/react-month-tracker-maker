import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material"

function Goals( {columns, rows, textfields, emojis, selectedFonts, selectedColors} ) {
  const lastFont = selectedFonts[selectedFonts.length - 2];
  const lastColor = selectedColors[selectedColors.length - 2];

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
                <Typography sx={{ position: 'relative',
        // display: 'inline-block',
        // color: 'white',
        // textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
        fontSize: '0.8rem',fontFamily: lastFont, color: lastColor }}>
                  {/* <b> */}
                  {textfields[index]}
                  {/* </b> */}
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