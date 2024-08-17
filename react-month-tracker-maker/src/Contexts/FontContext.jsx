import React, { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSettings, setFontSettings] = useState(() => {
    const saved = localStorage.getItem('fontSettings');
    return saved ? JSON.parse(saved) : {
      selectedFonts: ['Pacifico', 'Lobster', 'Open Sans', 'Bebas Neue', 'Poppins', 'Silkscreen', ''],
      selectedColors: ['#aabbcc', '#000', '#286097', '#26486A', '#7E8389', '#aabbcc', '']
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

  return (
    <FontContext.Provider
      value={{
        selectedFonts: fontSettings.selectedFonts,
        selectedColors: fontSettings.selectedColors,
        updateSelectedFonts,
        updateSelectedColors
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => useContext(FontContext);
