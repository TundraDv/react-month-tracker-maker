import React, { createContext, useState, useContext } from 'react';

const DayShapeContext = createContext();

export const DayShapeProvider = ({ children }) => {
  const [selectedImageDayShape, setSelectedImage] = useState(null);
  const [transparency, setTransparency] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#000');

  const updateSelectedImage = (image) => {
    setSelectedImage(image.includes("None.png") ? "" : image);
  };
  const updateTransparency = (value) => {
    setTransparency(value);
  };
  const updateBackgroundColor = (value) => {
    setBackgroundColor(value);
  };

  return (
    <DayShapeContext.Provider 
    value={{
      transparency,
      updateTransparency,
      backgroundColor,
      updateBackgroundColor,
      selectedImageDayShape, 
      updateSelectedImage }}>
      {children}
    </DayShapeContext.Provider>
  );
};

export const useDayShapeContext = () => useContext(DayShapeContext);
