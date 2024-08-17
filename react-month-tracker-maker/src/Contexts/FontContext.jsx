import React, { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSettings, setFontSettings] = useState(() => {
    const saved = localStorage.getItem('fontSettings');
    return saved ? JSON.parse(saved) : {
      selectedFonts: ['Pacifico', 'Lobster', 'Open Sans', 'Bebas Neue', 'Poppins', 'Silkscreen', ''],
      selectedColors: ['#aabbcc', '#000', '#286097', '#26486A', '#7E8389', '#aabbcc', ''],
      boldSettings: [false, false, false, false, false, false, false], // Example default
      italicSettings: [false, false, false, false, false, false, false], // Example default
      fontSizes: [16, 16, 16, 16, 16, 16, 16], // Example default font size in px
    };
  });

  useEffect(() => {
    localStorage.setItem('fontSettings', JSON.stringify(fontSettings));
  }, [fontSettings]);

  const updateSelectedFonts = (value) => {
    setFontSettings(prev => ({ ...prev, selectedFonts: value }));
  };

  const updateSelectedColors = (value) => {
    setFontSettings(prev => ({ ...prev, selectedColors: value }));
  };

  const updateBoldSettings = (index, value) => {
    const newBoldSettings = [...fontSettings.boldSettings];
    newBoldSettings[index] = value;
    setFontSettings(prev => ({ ...prev, boldSettings: newBoldSettings }));
  };

  const updateItalicSettings = (index, value) => {
    const newItalicSettings = [...fontSettings.italicSettings];
    newItalicSettings[index] = value;
    setFontSettings(prev => ({ ...prev, italicSettings: newItalicSettings }));
  };

  const updateFontSizes = (index, size) => {
    const newFontSizes = [...fontSettings.fontSizes];
    newFontSizes[index] = size;
    setFontSettings(prev => ({ ...prev, fontSizes: newFontSizes }));
  };

  return (
    <FontContext.Provider
      value={{
        selectedFonts: fontSettings.selectedFonts,
        selectedColors: fontSettings.selectedColors,
        boldSettings: fontSettings.boldSettings,
        italicSettings: fontSettings.italicSettings,
        fontSizes: fontSettings.fontSizes,
        updateSelectedFonts,
        updateSelectedColors,
        updateBoldSettings,
        updateItalicSettings,
        updateFontSizes
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => useContext(FontContext);
