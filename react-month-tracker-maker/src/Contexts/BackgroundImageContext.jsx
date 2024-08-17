import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import BackgroundImage from '../Assets/BackgroundImage/backgroundImages.json';

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('backgroundImageSettings');
    return saved ? JSON.parse(saved) : {
      imageData: BackgroundImage,
      imageLocalData: [],
      selectedLocalImage: null,
      selectedImageBackground: "",
      selectedId: 0,
      transparency: 0.5,
      backgroundColor: '#fff'
    };
  });

  useEffect(() => {
    localStorage.setItem('backgroundImageSettings', JSON.stringify(settings));
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
    const newImg = image.includes("None.png") ? "blank.jpg" : image;
    setSettings(prev => ({ ...prev, selectedImageBackground: newImg}));
  };

  const updateTransparency = (value) => {
    setSettings(prev => ({ ...prev, transparency: value }));
  };

  const updateBackgroundColor = (value) => {
    setSettings(prev => ({ ...prev, backgroundColor: value }));
  };

  const memoizedImageData = useMemo(() => BackgroundImage, []);

  return (
    <BackgroundImageContext.Provider
      value={{
        imageData: memoizedImageData,
        selectedId: settings.selectedId,
        updateSelectedId,
        imageLocalData: settings.imageLocalData,
        updateImageLocalData,
        selectedLocalImage: settings.selectedLocalImage,
        updateSelectedLocalImage,
        selectedImageBackground: settings.selectedImageBackground,
        updateSelectedImage,
        backgroundColor: settings.backgroundColor,
        updateBackgroundColor,
        transparency: settings.transparency,
        updateTransparency
      }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImageContext = () => useContext(BackgroundImageContext);
