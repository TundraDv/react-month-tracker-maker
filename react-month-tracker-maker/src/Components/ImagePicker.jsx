import React, { useState } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

function ImagePicker({ imageData,  cols, context }) {
  const [selectedId, setSelectedId] = useState(1);
  const { updateSelectedImage } = context();

  const handleImageClick = (image) => {
    setSelectedId(image.id);
    updateSelectedImage(image.src)
  };
  const figureSize = 150;
  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <ImageList 
      sx={{ width: '100%', height: 'auto', overflowX: 'auto' }} 
      cols={cols} 
      rowHeight={figureSize}
      gap={5}>
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
  );
}

export default ImagePicker;
