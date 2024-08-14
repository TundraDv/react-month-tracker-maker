import React, { createContext, useState, useContext, useEffect } from 'react';
import DayShapeImage from '../Assets/DayShape/daysShapes.json'; 

const DayShapeContext = createContext();

export const DayShapeProvider = ({ children }) => {
  const [imageData, setDayShapeImageData] = useState(DayShapeImage);
  const [imageLocalData, setImageLocalData] = useState(() => {
    const saved = localStorage.getItem('selectedLocalDayShape');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedLocalImage, setSelectedLocalImage] = useState(() => {
    const saved = localStorage.getItem('selectedLocalImageDayShape');
    return saved ? JSON.parse(saved) : null;
  });


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
    localStorage.setItem('selectedLocalDayShape', JSON.stringify(imageLocalData));
    localStorage.setItem('selectedLocalImageDayShape', JSON.stringify(selectedLocalImage));
    localStorage.setItem('selectedImageDayShape', JSON.stringify(selectedImageDayShape));
    localStorage.setItem('transparencyDayShape', JSON.stringify(transparency));
    localStorage.setItem('backgroundColorDayShape', JSON.stringify(backgroundColor));
  }, [
    imageLocalData,
    selectedLocalImage,
    selectedImageDayShape,
    transparency,
    backgroundColor,
  ]);

  const updateImageLocalData = (images) => {
    setImageLocalData(images);
  };

  const updateSelectedLocalImage = (index) => {
    setSelectedLocalImage(index);
  };

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
      imageData,
      imageLocalData,
      updateImageLocalData,
      selectedLocalImage,
      updateSelectedLocalImage,
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
