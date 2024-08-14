import React, { useState } from "react";
import { Select, Box, MenuItem, Grid, Typography } from "@mui/material";
import { useFontContext } from "../Contexts/FontContext";
import { HexColorPicker } from "react-colorful";
import { useLanguage } from '../Contexts/LanguageContext';
import '@fontsource/roboto';
import '@fontsource/lobster';
import '@fontsource/open-sans';
import '@fontsource/kalam';
import '@fontsource/spectral';
import '@fontsource/abril-fatface';
// Supports weights 100-900
import '@fontsource-variable/exo';
// Supports weights 100-900
import '@fontsource-variable/comfortaa';
import '@fontsource/poppins';
import '@fontsource/bebas-neue';
// Supports weights 100-900
import '@fontsource-variable/montserrat';
// Supports weights 200-900
import '@fontsource-variable/cairo';
import '@fontsource/dm-serif-display';
// Supports weights 400-700
import '@fontsource-variable/dancing-script';
// Supports weights 200-900
import '@fontsource-variable/inconsolata';
import '@fontsource/merriweather';
import '@fontsource/megrim';
import '@fontsource/ribeye-marrow';
// Supports weights 100-700
import '@fontsource-variable/josefin-sans';
import '@fontsource/pacifico';
// Supports weights 100-900
import '@fontsource-variable/lexend';
// Supports weights 200-900
import '@fontsource-variable/nunito';
// Supports weights 100-900
import '@fontsource-variable/lexend';
import '@fontsource/press-start-2p';
import '@fontsource/audiowide';
import '@fontsource/bungee-shade';
import '@fontsource/silkscreen';
import '@fontsource/bungee-hairline';

function FontPicker() {
  const { selectedFonts, updateSelectedFonts, selectedColors, updateSelectedColors } = useFontContext();
  const { translate } = useLanguage();
  const fonts = [
    'Abril Fatface', 
    'Audiowide', 
    'Bebas Neue', 
    'Bungee Hairline', 
    'Bungee Shade', 
    'Cairo Variable', 
    'Comfortaa Variable', 
    'Dancing Script Variable', 
    'DM Serif Display', 
    'Exo Variable', 
    'Inconsolata Variable', 
    'Josefin Sans Variable', 
    'Kalam', 
    'Lexend Variable', 
    'Lobster', 
    'Megrim', 
    'Merriweather', 
    'Montserrat Variable', 
    'Nunito Variable', 
    'Open Sans', 
    'Pacifico', 
    'Poppins', 
    'Press Start 2P', 
    'Ribeye Marrow', 
    'Roboto', 
    'Silkscreen', 
    'Spectral'
  ];  
  const parts = translate("fonts-label");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFont = (index) => (event) => {
    const newSelectedFonts = [...selectedFonts];
    if (index === (selectedFonts.length - 1)) {
      updateSelectedFonts(newSelectedFonts.fill(event.target.value));
    } else {
      newSelectedFonts[index] = event.target.value;
      newSelectedFonts[selectedFonts.length - 1] = '';
      updateSelectedFonts(newSelectedFonts);
    }
    setActiveIndex(null);
  };

  const handleSquareClick = (index) => () => {
    setActiveIndex(activeIndex === index ? null : index);
  }

  const handleColorPicker = (color) => {
    if (activeIndex !== null && activeIndex !== (selectedColors.length - 1)) {
      const newSelectedColors = [...selectedColors];
      newSelectedColors[activeIndex] = color;
      newSelectedColors[selectedFonts.length - 1] = '';
      updateSelectedColors(newSelectedColors);
    }
    if (activeIndex === (selectedColors.length - 1)) {
      const newSelectedColors = [...selectedColors];
      updateSelectedColors(newSelectedColors.fill(color));
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
              onChange={handleFont(index)} fullWidth>
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    <Typography key={font} style={{ fontFamily: font }}>{font.replace(' Variable', '')}</Typography>
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
