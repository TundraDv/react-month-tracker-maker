import React, { createContext, useState, useContext, useEffect } from 'react';
import DayShapeImage from '../Assets/DayShape/daysShapes.json'; 

const DayShapeContext = createContext();

export const DayShapeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('dayShapeSettings');
    return saved ? JSON.parse(saved) : {
      imageData: DayShapeImage,
      imageLocalData: [],
      selectedLocalImage: null,
      selectedImageDayShape: null,
      selectedId: 0,
      transparency: 1,
      backgroundColor: '#000'
    };
  });

  useEffect(() => {
    const updatedImageDayShape = settings.selectedImageDayShape 
      ? settings.selectedImageDayShape.includes("None.png") 
        ? "" 
        : settings.selectedImageDayShape 
      : ""; // Fallback if it's null or undefined

    localStorage.setItem('dayShapeSettings', JSON.stringify({
      ...settings,
      selectedImageDayShape: updatedImageDayShape
    }));
  }, [settings]);

  const updateSelectedId = (id) => {
    setSettings(prev => ({ ...prev, selectedId: id }));
  };

  const updateImageLocalData = (images) => {
    setSettings(prev => ({ ...prev, imageLocalData: images }));
  };

  const updateSelectedLocalImage = (index) => {
    setSettings(prev => ({ ...prev, selectedLocalImage: index }));
  };

  const updateSelectedImage = (image) => {
    setSettings(prev => ({ 
      ...prev, 
      selectedImageDayShape: image && image.includes("None.png") ? "" : image 
    }));
  };

  const updateTransparency = (value) => {
    setSettings(prev => ({ ...prev, transparency: value }));
  };

  const updateBackgroundColor = (value) => {
    setSettings(prev => ({ ...prev, backgroundColor: value }));
  };

  return (
    <DayShapeContext.Provider 
      value={{
        imageData: settings.imageData,
        selectedId: settings.selectedId,
        updateSelectedId,
        imageLocalData: settings.imageLocalData,
        updateImageLocalData,
        selectedLocalImage: settings.selectedLocalImage,
        updateSelectedLocalImage,
        selectedImageDayShape: settings.selectedImageDayShape,
        updateSelectedImage,
        transparency: settings.transparency,
        updateTransparency,
        backgroundColor: settings.backgroundColor,
        updateBackgroundColor
      }}
    >
      {children}
    </DayShapeContext.Provider>
  );
};

export const useDayShapeContext = () => useContext(DayShapeContext);
