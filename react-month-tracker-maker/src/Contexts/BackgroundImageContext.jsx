import React, { createContext, useState, useContext } from 'react';

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [selectedImageBackground, setSelectedImage] = useState(null);

  const updateSelectedImage = (image) => {
    setSelectedImage(image.includes("None.png") ? "" : image);
  };

  return (
    <BackgroundImageContext.Provider value={{ selectedImageBackground, updateSelectedImage }}>
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImageContext = () => useContext(BackgroundImageContext);