import React, { useState, useRef, useEffect } from "react";
import { Select, Box, Stack, MenuItem, Grid, Typography, IconButton } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useFontContext } from "../Contexts/FontContext";
import { useLanguage } from '../Contexts/LanguageContext';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';

// Import fonts (only regular weight)
import '@fontsource/roboto/400.css';
import '@fontsource/lobster/400.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/kalam/400.css';
import '@fontsource/spectral/400.css';
import '@fontsource/abril-fatface/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/merriweather/400.css';
import '@fontsource/megrim/400.css';
import '@fontsource/ribeye-marrow/400.css';
import '@fontsource/pacifico/400.css';
import '@fontsource/press-start-2p/400.css';
import '@fontsource/audiowide/400.css';
import '@fontsource/bungee-shade/400.css';
import '@fontsource/silkscreen/400.css';
import '@fontsource/bungee-hairline/400.css';

// Import variable fonts
import '@fontsource-variable/exo';
import '@fontsource-variable/comfortaa';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/cairo';
import '@fontsource-variable/dancing-script';
import '@fontsource-variable/inconsolata';
import '@fontsource-variable/josefin-sans';
import '@fontsource-variable/lexend';
import '@fontsource-variable/nunito';

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

function FontPicker() {
  const { selectedFonts, 
          updateSelectedFonts, 
          selectedColors, 
          updateSelectedColors, 
          boldSettings, 
          updateBoldSettings, 
          italicSettings, 
          updateItalicSettings, 
          fontSizes, 
          updateFontSizes } = useFontContext();
  const { translate } = useLanguage();
  
  const parts = translate("fonts-label");
  const [activeIndex, setActiveIndex] = useState(null);
  const maxFontSize = 36; // Maximum font size
  const minFontSize = 12; // Minimum font size

  // Ref to the color picker
  const colorPickerRef = useRef(null);

  // Close color picker on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerRef]);

  // Update font selection
  const handleFontChange = (index) => (event) => {
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

  // Toggle color picker visibility
  const toggleColorPicker = (index) => () => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Update color selection
  const handleColorChange = (color) => {
    if (activeIndex !== null) {
      const newSelectedColors = [...selectedColors];
      newSelectedColors[activeIndex] = color;
      newSelectedColors[selectedFonts.length - 1] = '';
      updateSelectedColors(newSelectedColors);
    }
  };

  // Toggle bold/italic styles
  const toggleStyle = (style) => {
    const newBoldSettings = [...boldSettings];
    const newItalicSettings = [...italicSettings];
    if (style === 'fontWeight') {
      newBoldSettings[activeIndex] = !newBoldSettings[activeIndex];
      updateBoldSettings(newBoldSettings);
    } else if (style === 'fontStyle') {
      newItalicSettings[activeIndex] = !newItalicSettings[activeIndex];
      updateItalicSettings(newItalicSettings);
    }
  };

  // Increase font size
  const increaseFontSize = () => {
    const newFontSizes = [...fontSizes];
    const currentSize = newFontSizes[activeIndex] || 16; // Default font size
    if (currentSize < maxFontSize) {
      newFontSizes[activeIndex] = currentSize + 2;
      updateFontSizes(newFontSizes);
    }
  };

  // Decrease font size
  const decreaseFontSize = () => {
    const newFontSizes = [...fontSizes];
    const currentSize = newFontSizes[activeIndex] || 16; // Default font size
    if (currentSize > minFontSize) {
      newFontSizes[activeIndex] = currentSize - 2;
      updateFontSizes(newFontSizes);
    }
  };

  return (
    <Box>
      {parts.map((part, index) => (
        <Box key={index} sx={{ position: 'relative', marginBottom: 2 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={3}>
              <Typography>{part}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select 
                value={selectedFonts[index]} 
                onClick={() => setActiveIndex(null)}
                onChange={handleFontChange(index)} 
                fullWidth
                sx={{ height: 50 }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 400, 
                    },
                  },
                }}
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    <Typography style={{ fontFamily: font }}>{font.replace(' Variable', '')}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box
                  sx={{
                    width: 55,
                    height: 50,
                    backgroundColor: selectedColors[index], 
                    cursor: 'pointer',
                    borderRadius: 1,
                    border: '0.1px solid',
                    borderColor: selectedColors[index] !== '#ffffff' ? selectedColors[index] : 'none'
                  }}
                  onClick={toggleColorPicker(index)}
                />
                <Stack direction="row" spacing={0.5}>
                  <IconButton onClick={() => toggleStyle('fontWeight')}>
                    <FormatBoldIcon color={boldSettings[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton onClick={() => toggleStyle('fontStyle')}>
                    <FormatItalicIcon color={italicSettings[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton onClick={increaseFontSize} disabled={(fontSizes[index] || 16) >= maxFontSize}>
                    <TextIncreaseIcon />
                  </IconButton>
                  <IconButton onClick={decreaseFontSize} disabled={(fontSizes[index] || 16) <= minFontSize}>
                    <TextDecreaseIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {activeIndex === index && (
            <Box
              ref={colorPickerRef} // Attach ref here
              sx={{
                position: 'absolute',
                top: 0, 
                right: 40,
                zIndex: 10,
                backgroundColor: 'white',
                borderRadius: 1,
              }}
            >
              <HexColorPicker color={selectedColors[activeIndex]} onChange={handleColorChange} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default FontPicker;
