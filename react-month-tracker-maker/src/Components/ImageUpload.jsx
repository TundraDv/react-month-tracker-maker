import React, { useState } from 'react';
import { Button } from '@mui/material';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImage(imageUrl);
        localStorage.setItem('uploadedImage', imageUrl); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleUploadClick}>
        Upload Image
      </Button>
      {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
}

export default ImageUpload;
