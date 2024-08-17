import React, { useRef } from 'react';
import { Button, Alert } from '@mui/material';
import html2canvas from 'html2canvas';
import { useLanguage } from '../Contexts/LanguageContext';

function ImageUploadButton({ context }) {
  const { imageLocalData, updateImageLocalData } = context();
  const { translate } = useLanguage();
  const captureRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      const fileDataUrls = [];

      for (const file of files) {
        const fileDataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
        fileDataUrls.push(fileDataUrl);
      }

      // Capture the screenshot of the element
      if (captureRef.current) {
        html2canvas(captureRef.current, { scale: 4 }).then((canvas) => {
          // You can use the canvas to get the screenshot data
          const screenshotDataUrl = canvas.toDataURL('image/png');

          // Do something with the screenshot, e.g., save or display it
          console.log('Screenshot Data URL:', screenshotDataUrl);

          // Update image data if needed
          const updatedImages = Array.isArray(imageLocalData)
            ? [...imageLocalData, ...fileDataUrls]
            : [...fileDataUrls];
          updateImageLocalData(updatedImages);
        });
      }
    }
  };

  return (
    <>
      <Button
        disabled={imageLocalData.length > 1}
        variant="outlined"
        color="primary"
        component="span"
      >
        <label htmlFor="upload-button" style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            id="upload-button"
            onChange={handleFileChange}
          />
          {translate("upload-button")}
        </label>
      </Button>
      {imageLocalData.length > 1 && (
        <Alert
          severity="error"
          sx={{ marginY: 1, top: 60, left: 0, right: 0, zIndex: 10 }}
        >
          {translate("upload-alert")}
        </Alert>
      )}
      <div ref={captureRef} style={{ display: 'none' }}>
        {/* This is the element that will be captured by html2canvas */}
        {imageLocalData.map((dataUrl, index) => (
          <img key={index} src={dataUrl} alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
        ))}
      </div>
    </>
  );
}

export default ImageUploadButton;
