import React, { useEffect, useState } from 'react';
import { Button,Alert, Tooltip, Typography } from '@mui/material';
import { useLanguage } from '../Contexts/LanguageContext';

function ImageUploadButton({ context }) {
  const { imageLocalData, updateImageLocalData } = context();
  const { translate } = useLanguage();

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
        
        const updatedImages = Array.isArray(imageLocalData)
            ? [...imageLocalData, ...fileDataUrls]
            : [...fileDataUrls];
        updateImageLocalData(updatedImages);
    }
  };

  return (
    <>
      <Button disabled={imageLocalData.length > 1} variant="outlined" color="primary" component="span">
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
          sx={{ marginBottom: 2, position: 'absolute', top: 60, left: 0, right: 0, zIndex: 10 }}
        >
          {translate("upload-alert")}
        </Alert>
      )}
    </>
  );
}

export default ImageUploadButton;
