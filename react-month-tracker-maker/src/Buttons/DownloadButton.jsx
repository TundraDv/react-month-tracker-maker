import React from "react";
import domtoimage from 'dom-to-image-more';
import { useLanguage } from '../Contexts/LanguageContext';
import { Button } from '@mui/material';

function DownloadButton({ id_CardElement, title }) {
  const { translate } = useLanguage();

  const handleDownload = () => {
    const cardElement = document.getElementById(id_CardElement);
    
    // Use a fixed scale factor for testing
    const scale = 2; // Adjust as needed

    // Calculate scaled dimensions
    const width = cardElement.offsetWidth * scale;
    const height = cardElement.offsetHeight * scale;

    const style = {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: `${cardElement.offsetWidth}px`,
      height: `${cardElement.offsetHeight}px`
    };

    const param = {
      width,
      height,
      quality: 1, // Quality parameter for JPEG
      style
    };

    domtoimage.toJpeg(cardElement, param)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${title}-star-tracker-maker.jpg`;
        link.click();
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  };

  return (
    <Button sx={{ width: "50%" }} variant="contained" onClick={handleDownload}>
      {translate("download-button")}
    </Button>
  );
}

export default DownloadButton;
