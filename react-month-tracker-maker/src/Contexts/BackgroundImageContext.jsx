import React, { createContext, useState, useContext, useEffect } from 'react';
import BackgroundImage from '../Assets/BackgroundImage/backgroundImages.json';

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState(BackgroundImage);
  const [imageLocalData, setImageLocalData] = useState(() => {
    const saved = localStorage.getItem('imageLocalBackground');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedLocalImage, setSelectedLocalImage] = useState(() => {
    const saved = localStorage.getItem('selectedLocalImageBackground');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedImageBackground, setSelectedImageBackground] = useState(() => {
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
    localStorage.setItem('imageLocalBackground', JSON.stringify(imageLocalData));
    localStorage.setItem('selectedLocalImageBackground', JSON.stringify(selectedLocalImage));
    localStorage.setItem('selectedImageBackground', JSON.stringify(selectedImageBackground));
    localStorage.setItem('transparency', JSON.stringify(transparency));
    localStorage.setItem('backgroundColor', JSON.stringify(backgroundColor));
  }, [
    imageLocalData,
    selectedLocalImage,
    selectedImageBackground,
    transparency,
    backgroundColor,
  ]);

  const updateImageLocalData = (images) => {
    setImageLocalData(images);
    console.log("imageLocalData", imageLocalData);
  };

  const updateSelectedLocalImage = (index) => {
    setSelectedLocalImage(index);
  };

  const updateSelectedImage = (image) => {
    setSelectedImageBackground(image.includes("None.png") ? "blank.jpg" : image);
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
        imageData,
        imageLocalData,
        updateImageLocalData,
        selectedLocalImage,
        updateSelectedLocalImage,
        selectedImageBackground,
        updateSelectedImage,
        backgroundColor,
        updateBackgroundColor,
        transparency,
        updateTransparency
      }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImageContext = () => useContext(BackgroundImageContext);
