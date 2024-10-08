import React, { useState, useEffect, useRef } from "react";
import { Box, ImageList, ImageListItem, Slider, Grid, Typography, IconButton } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useLanguage } from '../Contexts/LanguageContext';
import ImageUploadButton from '../Buttons/ImageUploadButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ImagePicker({ context }) {
  const [activeColorPicker, setActiveColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const { imageData,
          selectedId,
          updateSelectedId,
          imageLocalData,
          updateImageLocalData,
          selectedLocalImage,
          updateSelectedLocalImage,
          updateSelectedImage, 
          updateTransparency, 
          updateBackgroundColor, 
          transparency, 
          backgroundColor } = context();
  const { translate } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setActiveColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = (image, index) => {
    updateSelectedId(index);
    updateSelectedImage(image.src);
    setActiveColorPicker(false);
    updateSelectedLocalImage(null);
  };

  const handleImageClickLocal = (index) => {
    if (imageLocalData.length > 2) {
      return;
    }
    updateSelectedLocalImage(index);
  };

  const handleTransparency = (event, value) => {
    updateTransparency(value);
  };

  const handleSquareClick = () => {
    setActiveColorPicker(!activeColorPicker);
  };

  const handleColorPicker = (color) => {
    updateBackgroundColor(color);
  };

  const handleDeleteImage = (index) => {
    if (selectedLocalImage === index) {
      updateSelectedLocalImage(null);
    }
    const updatedImages = imageLocalData.filter((_, i) => i !== index);
    updateImageLocalData(updatedImages);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography>{translate("color-label")}</Typography>
      <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={10.5}>
          <Slider
            aria-label="Transparency"
            value={transparency}
            step={0.1}
            marks
            min={0}
            max={1}
            valueLabelDisplay="auto"
            onChange={handleTransparency}
          />
        </Grid>
        <Grid item xs={1.5}>
          <Box
            sx={{
              height: 20,
              backgroundColor: backgroundColor,
              cursor: 'pointer',
              borderRadius: 1,
              border: '0.1px solid'
            }}
            onClick={handleSquareClick}
          />
        </Grid>
      </Grid>
      {activeColorPicker && (
        <Box
          ref={colorPickerRef}
          sx={{
            position: 'absolute',
            top: 60,
            right: 0,
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        >
          <HexColorPicker color={backgroundColor} onChange={handleColorPicker} />
        </Box>
      )}
      <ImageUploadButton context={context}/>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', marginTop: 6 }}>
        <ImageList
          sx={{ width: '100%', height: 'auto', overflowX: 'auto' }}
          cols={3}
          gap={5}
          rowHeight="auto"
        >
          {imageLocalData && imageLocalData.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{
                position: 'relative',
                paddingTop: '100%',
                overflow: 'hidden',
                borderRadius: 1,
                cursor: 'pointer', 
              }}
              onClick={() => handleImageClickLocal(index)}
            >
              <img
                src={item}
                alt={`Uploaded ${index}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {selectedLocalImage === index && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {translate("selected-label")}
                </div>
              )}
              <IconButton
                color="error"
                sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
          {imageData && imageData.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{
                position: 'relative',
                paddingTop: '100%',
                overflow: 'hidden',
                borderRadius: 1,
                cursor: 'pointer', 
              }}
              onClick={() => handleImageClick(item, index)}
            >
              <img
                src={require(`../Assets/${item.src}`)}
                srcSet={`${require(`../Assets/${item.src}`)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {(index === selectedId) && (selectedLocalImage === null) && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {translate("selected-label")}
                </div>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

export default ImagePicker;
