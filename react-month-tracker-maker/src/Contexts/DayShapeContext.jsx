import React, { createContext, useState, useContext, useEffect } from 'react';

const DayShapeContext = createContext();

export const DayShapeProvider = ({ children }) => {
  const [selectedImageDayShape, setSelectedImage] = useState(() => {
    const saved = localStorage.getItem('selectedImageDayShape');
    return saved ? JSON.parse(saved) : null;
  });
  const [transparency, setTransparency] = useState(() => {
    const saved = localStorage.getItem('transparencyDayShape');
    return saved ? JSON.parse(saved) : 1;
  });

  const [backgroundColor, setBackgroundColor] = useState(() => {
    const saved = localStorage.getItem('backgroundColorDayShape');
    return saved ? JSON.parse(saved) : '#000';
  });

  useEffect(() => {
    localStorage.setItem('selectedImageDayShape', JSON.stringify(selectedImageDayShape));
    localStorage.setItem('transparencyDayShape', JSON.stringify(transparency));
    localStorage.setItem('textfieldsDayShape', JSON.stringify(backgroundColor));
  }, [
    selectedImageDayShape,
    transparency,
    backgroundColor,
  ]);

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
