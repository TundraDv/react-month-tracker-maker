import React, { createContext, useState, useContext } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [selectedFonts, setSelectedFonts] = useState(['Roboto', 'Lobster', 'Open Sans','Kalam', 'Spectral', 'Open Sans']);
  const [selectedColors, setSelectedColors] = useState(['#aabbcc', '#000', '#286097','#26486A', '#7E8389', '#aabbcc']);

  const updateSelectedFonts = (value) => {
    setSelectedFonts(value);
  };
  const updateSelectedColors = (value) => {
    setSelectedColors(value);
  };

  return (
    <FontContext.Provider 
    value={{ selectedFonts,
              selectedColors,
              updateSelectedFonts,
              updateSelectedColors }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => useContext(FontContext);