import React, { createContext, useState, useContext } from 'react';

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [selectedImageBackground, setSelectedImage] = useState(null);
  const [transparency, setTransparency] = useState(0.5);
  const [backgroundColor, setBackgroundColor] = useState('#ffff');

  const updateSelectedImage = (image) => {
    setSelectedImage(image.includes("None.png") ? "blank.png" : image);
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