import React from "react";
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';

function DownloadButton({ id_CardElement, title }) {
  const handleDownload = () => {
    const cardElement = document.getElementById(id_CardElement);

    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${title}-star-tracker-maker.png`;
      link.click();
    });
  };

  return (
    <Button sx={{ width: "50%" }} variant="contained" onClick={handleDownload}>
      Download Image
    </Button>
  )
}

export default DownloadButton;