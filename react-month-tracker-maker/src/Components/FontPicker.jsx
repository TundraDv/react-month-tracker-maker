import React, { useState } from "react";
import { Select, Box, MenuItem, Grid, Typography } from "@mui/material";
import { useFontContext } from "../Contexts/FontContext";
import { HexColorPicker } from "react-colorful";
import '@fontsource/roboto';
import '@fontsource/lobster';
import '@fontsource/open-sans';
import '@fontsource/kalam';
import '@fontsource/spectral';

function FontPicker() {
  const { selectedFonts, updateSelectedFonts, selectedColors, updateSelectedColors } = useFontContext();
  const fonts = ['Roboto', 'Lobster', 'Open Sans', 'Kalam', 'Spectral'];
  const parts = ['Title', 'Month', 'Year', 'Days Name', 'Days Numbers', 'Goals'];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleChange = (index) => (event) => {
    setActiveIndex(null);
    const newSelectedFonts = [...selectedFonts];
    newSelectedFonts[index] = event.target.value;
    updateSelectedFonts(newSelectedFonts);
  };

  const handleSquareClick = (index) => () => {
    setActiveIndex(activeIndex === index ? null : index);
  }

  const handleColorPicker = (color) => {
    if (activeIndex !== null) {
      const newSelectedColors = [...selectedColors];
      newSelectedColors[activeIndex] = color;
      updateSelectedColors(newSelectedColors);
    }
  };

  return (
    <Box>
      {parts.map((part, index) => (
        <Box key={index} sx={{ position: 'relative', marginBottom: 2 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={5.5}>
              <Typography>{part}</Typography>
            </Grid>
            <Grid item xs={5.5}>
              <Select value={selectedFonts[index]} onClick={() => setActiveIndex(null)}
              onChange={handleChange(index)} fullWidth>
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    <Typography style={{ fontFamily: font }}>{font}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  width: '100%',
                  height: 55,
                  backgroundColor: selectedColors[index], 
                  cursor: 'pointer',
                  borderRadius: 1,
                  border: '0.1px solid',
                  borderColor: selectedColors[index] !== '#ffffff' ? selectedColors[index] : 'none'
                }}
                onClick={handleSquareClick(index)}
              />
            </Grid>
          </Grid>
          {activeIndex === index ? (
            <Box
              sx={{
                position: 'absolute',
                top: 0, 
                right: 40,
                zIndex: 10,
                backgroundColor: 'white',
                borderRadius: 1,
              }}
            >
              <HexColorPicker color={selectedColors[activeIndex]} onChange={handleColorPicker} />
            </Box>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}

export default FontPicker;
