import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Slider, Grid, Typography } from "@mui/material";
import { useBackgroundImageContext } from "../Contexts/BackgroundImageContext";
import { HexColorPicker } from "react-colorful";

function ImagePicker({ imageData, context }) {
  const [selectedId, setSelectedId] = useState(1);
  const [activeColorPicker, setActiveColorPicker] = useState(false);
  const { updateSelectedImage } = context();
  const { transparency, updateTransparency, backgroundColor, updateBackgroundColor } = useBackgroundImageContext();

  const handleImageClick = (image) => {
    setSelectedId(image.id);
    updateSelectedImage(image.src);
    setActiveColorPicker(false);
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
  
  return (
    <Box sx={{ position: 'relative' }}>
    <Typography >
      Transparency & Color
    </Typography>
      <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={11}>
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
        <Grid item xs={1}>
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
      <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
        <ImageList 
          sx={{ width: '100%', height: 'auto', overflowX: 'auto' }} 
          cols={3} 
          gap={5}
          rowHeight="auto"
        >
          {imageData.map((item) => (
            <ImageListItem
              key={item.id}
              sx={{ 
                position: 'relative', 
                paddingTop: '100%', 
                overflow: 'hidden',
                borderRadius: 1,
              }}
              onClick={() => handleImageClick(item)}
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
              {item.id === selectedId && (
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
                  Selected
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
