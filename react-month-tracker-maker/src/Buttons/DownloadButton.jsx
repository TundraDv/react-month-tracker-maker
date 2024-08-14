import React from "react";
import domtoimage from 'dom-to-image-more';
import { useLanguage } from '../Contexts/LanguageContext';
import { Button } from '@mui/material';

function DownloadButton({ id_CardElement, title }) {
  const { translate } = useLanguage();
  const handleDownload = () => {
    const cardElement = document.getElementById(id_CardElement);
    domtoimage.toPng(cardElement, { 
      bgcolor: 'null', 
      quality: 1 
    }).then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${title}-star-tracker-maker.png`;
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
  )
}

export default DownloadButton;