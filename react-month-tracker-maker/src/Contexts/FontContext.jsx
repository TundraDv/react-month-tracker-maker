import React, { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [selectedFonts, setSelectedFonts] = useState(() => {
    const saved = localStorage.getItem('selectedFonts');
    return saved ? JSON.parse(saved) : ['Pacifico', 'Lobster', 'Open Sans', 'Bebas Neue', 'Poppins', 'Silkscreen', ''];
  });
  
  const [selectedColors, setSelectedColors] = useState(() => {
    const saved = localStorage.getItem('selectedColors');
    return saved ? JSON.parse(saved) : ['#aabbcc', '#000', '#286097','#26486A', '#7E8389', '#aabbcc', ''];
  });

  useEffect(() => {
    localStorage.setItem('selectedFonts', JSON.stringify(selectedFonts));
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
  }, [
    selectedFonts,
    selectedColors,
  ]);

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