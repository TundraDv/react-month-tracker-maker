import React, { createContext, useState, useContext } from 'react';

const DayShapeContext = createContext();

export const DayShapeProvider = ({ children }) => {
  const [selectedImageDayShape, setSelectedImage] = useState(null);

  const updateSelectedImage = (image) => {
    setSelectedImage(image.includes("None.png") ? "" : image);
  };
  

  return (
    <DayShapeContext.Provider value={{ selectedImageDayShape, updateSelectedImage }}>
      {children}
    </DayShapeContext.Provider>
  );
};

export const useDayShapeContext = () => useContext(DayShapeContext);
