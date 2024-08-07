import React, { createContext, useState, useContext, useEffect } from 'react';

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [selectedImageBackground, setSelectedImage] = useState(() => {
    const saved = localStorage.getItem('selectedImageBackground');
    return saved ? JSON.parse(saved) : null;
  });
  const [transparency, setTransparency] = useState(() => {
    const saved = localStorage.getItem('transparency');
    return saved ? JSON.parse(saved) : 0.5;
  });

  const [backgroundColor, setBackgroundColor] = useState(() => {
    const saved = localStorage.getItem('backgroundColor');
    return saved ? JSON.parse(saved) : '#fff';
  });

  useEffect(() => {
    localStorage.setItem('selectedImageBackground', JSON.stringify(selectedImageBackground));
    localStorage.setItem('transparency', JSON.stringify(transparency));
    localStorage.setItem('textfields', JSON.stringify(backgroundColor));
  }, [
    selectedImageBackground,
    transparency,
    backgroundColor,
  ]);

  const updateSelectedImage = (image) => {
    setSelectedImage(image.includes("None.png") ? "blank.jpg" : image);
  };
  const updateTransparency = (value) => {
    setTransparency(value);
  };
  const updateBackgroundColor = (value) => {
    setBackgroundColor(value);
  };

  return (
    <BackgroundImageContext.Provider 
    value={{ 
      selectedImageBackground, 
      updateSelectedImage,
      backgroundColor,
      updateBackgroundColor,
      updateTransparency,
      transparency }}>
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImageContext = () => useContext(BackgroundImageContext);