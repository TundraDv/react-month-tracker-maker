import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Slider, Grid, Typography } from "@mui/material";
import { useBackgroundImageContext } from "../Contexts/BackgroundImageContext";
import { HexColorPicker } from "react-colorful";

function ImagePicker({ imageData, cols, context }) {
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

  const figureSize = 150;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
        <ImageList 
          sx={{ width: '100%', height: 'auto', overflowX: 'auto' }} 
          cols={cols} 
          rowHeight={figureSize}
          gap={5}
        >
          {imageData.map((item) => (
            <ImageListItem
              key={item.id}
              sx={{ width: figureSize, height: figureSize, position: 'relative' }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={require(`../Assets/${item.src}`)}
                srcSet={`${require(`../Assets/${item.src}`)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
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
      <Typography sx={{ marginY: 2 }}>
        Transparency & Color
      </Typography>
      <Grid container alignItems="center" spacing={2}>
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
              border: '0.1px solid',
              // borderColor: backgroundColor === '#ffffff' ? backgroundColor : '#fff'
            }}
            onClick={handleSquareClick}
          />
        </Grid>
      </Grid>
      {activeColorPicker && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 40, 
            right: 0,
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        >
          <HexColorPicker color={backgroundColor} onChange={handleColorPicker} />
        </Box>
      )}
    </Box>
  );
}

export default ImagePicker;
