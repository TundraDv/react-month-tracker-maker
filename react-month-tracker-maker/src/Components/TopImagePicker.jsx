import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Slider, Grid, Typography } from "@mui/material";
import { useLanguage } from '../Contexts/LanguageContext';

function LanguageButton() {
  const [amountImages, setAmountImages ] = useState(1);
  const { translate } = useLanguage();
  const handleImage = (event, value) => {
    setAmountImages(value)
  }
  return (
    <Box>
      <Typography >
        {translate("top-images")}
      </Typography>
      <Slider
        aria-label="Transparency"
        value={amountImages}
        step={1}
        marks
        min={0}
        max={5}
        valueLabelDisplay="auto"
        onChange={handleImage}
      />
    </Box>
  )
}

export default LanguageButton;
