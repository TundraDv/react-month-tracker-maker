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
  const { 
    selectedFonts, 
    updateSelectedFonts, 
    selectedColors, 
    updateSelectedColors, 
    boldSettings, 
    updateBoldSettings, 
    italicSettings, 
    updateItalicSettings, 
    fontSizes, 
    updateFontSizes 
  } = useFontContext();

  const fontsLength = selectedFonts.length

  const { translate } = useLanguage();
  const parts = translate("fonts-label");
  const [activeIndex, setActiveIndex] = useState(null);
  const maxFontSize = 36; // Maximum font size
  const minFontSize = 10; // Minimum font size

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

  const handleFontChange = (index) => (event) => {
    const newSelectedFonts = [...selectedFonts];
    if (index === (fontsLength - 1)) {
      newSelectedFonts.fill(event.target.value);
    } else {
      newSelectedFonts[index] = event.target.value;
      newSelectedFonts[fontsLength - 1] = '';
    }
    updateSelectedFonts(newSelectedFonts);
    setActiveIndex(null);
  };

  const toggleColorPicker = (index) => () => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleColorChange = (color) => {
    const newSelectedColors = [...selectedColors];
    if (activeIndex !== null) {
      if (activeIndex === (fontsLength - 1)) {
        newSelectedColors.fill(color);
      } else {
        newSelectedColors[activeIndex] = color;
        newSelectedColors[fontsLength - 1] = '';
      }
      updateSelectedColors(newSelectedColors);
    }
  };
  

  const handleBold = (index) => () => {
    const newBoldSettings = [...boldSettings];
    if (index === (fontsLength - 1)) {
      const newBoldValue = !newBoldSettings[index];
      newBoldSettings.fill(newBoldValue);
    } else {
      newBoldSettings[index] = !newBoldSettings[index];
    }
    updateBoldSettings(newBoldSettings); 
  };

  const handleItalic = (index) => () => {
    const newItalicSettings = [...italicSettings];
    if (index === (fontsLength - 1)) {
      const newItalicValue = !newItalicSettings[index]; 
      newItalicSettings.fill(newItalicValue)
    } else {
      newItalicSettings[index] = !newItalicSettings[index];
      newItalicSettings[fontsLength - 1] = false;
    }
    updateItalicSettings(newItalicSettings);
  };

  const handleIncreaseFontSize = (index) => () => {
    const newFontSizes = [...fontSizes];
    if (index === (fontsLength - 1)) {
      for (let i = 0; i < fontsLength-1; i++) {
        const currentSize = newFontSizes[i] || 16; 
        if (currentSize < maxFontSize) {
          newFontSizes[i] = Math.min(currentSize + 2, maxFontSize);
        }
      }
    } else {
      const currentSize = newFontSizes[index] || 16;
      if (currentSize < maxFontSize) {
        newFontSizes[index] = Math.min(currentSize + 2, maxFontSize);
      }
    }
    updateFontSizes(newFontSizes); 
  };
  

  const handleDecreaseFontSize = (index) => () => {
    const newFontSizes = [...fontSizes];
    if (index === (fontsLength - 1)) {
      for (let i = 0; i < fontsLength-1; i++) {
        const currentSize = newFontSizes[i] || 16; 
        if (currentSize > minFontSize) {
          newFontSizes[i] = Math.max(currentSize - 2, minFontSize);
        }
      }
    } else {
      const currentSize = newFontSizes[index] || 16; 
      if (currentSize > minFontSize) {
        newFontSizes[index] = Math.max(currentSize - 2, minFontSize);
      }
    }
  
    updateFontSizes(newFontSizes); 
  };
  

  return (
    <Box>
      {parts.map((part, index) => (
        <Box key={index} sx={{ position: 'relative', marginBottom: 2 }}>
          <Grid container alignItems="center" spacing={0.5}>
            <Grid item xs={2.5}>
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
            <Grid item xs={5.5}>
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
                <Stack direction="row" spacing={0.3}>
                  <IconButton size="small" onClick={handleBold(index)}>
                    <FormatBoldIcon color={boldSettings[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton size="small" onClick={handleItalic(index)}>
                    <FormatItalicIcon color={italicSettings[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton size="small" onClick={handleDecreaseFontSize(index)} disabled={(fontSizes[index] || 16) <= minFontSize}>
                    <TextDecreaseIcon color={(fontSizes[index] || 16) <= minFontSize ? 'disabled' : 'action'} />
                  </IconButton>
                  <IconButton size="small" onClick={handleIncreaseFontSize(index)} disabled={(fontSizes[index] || 16) >= maxFontSize}>
                    <TextIncreaseIcon color={(fontSizes[index] || 16) >= maxFontSize ? 'disabled' : 'action'} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {activeIndex === index && (
            <Box
              ref={colorPickerRef}
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
