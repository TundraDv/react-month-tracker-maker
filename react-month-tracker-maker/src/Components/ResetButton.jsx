import React from "react";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import { useGoalsContext } from '../Contexts/GoalsContext';
import { useLanguage } from '../Contexts/LanguageContext';
import { Button } from "@mui/material"
import templates from "../Assets/Templates/templates.json"

function ResetButton() {
  const dataDefault = templates[0];
  const { updateSelectedImage, updateTransparency, updateBackgroundColor } = useBackgroundImageContext()
  const { updateSelectedImage: updateSelectedImageDayShape, updateTransparency: updateTransparencyDayShape, updateBackgroundColor: updateBackgroundColorDayShape } = useDayShapeContext();
  const { updateTitleTextContext, updateTitleContext, updateYearContext, updateDaysNameContext, updateMonthContext,  updateFirstDayContext, updateHeightContext } = useComponentsContext();
  const { updateSelectedFonts, updateSelectedColors } = useFontContext();
  const { updateColumns, updateRows, updateTextfields, updateEmojis } = useGoalsContext();
  const { translate } = useLanguage();

  const handleResetButton = () => {
    if (dataDefault) {
      updateSelectedImage(dataDefault.selectedImageBackground);
      updateTransparency(dataDefault.transparency);
      updateBackgroundColor(dataDefault.backgroundColor);

      updateSelectedImageDayShape(dataDefault.selectedImageDayShape);
      updateTransparencyDayShape(dataDefault.transparencyDayShape);
      updateBackgroundColorDayShape(dataDefault.backgroundColorDayShape);
  
      updateTitleTextContext(dataDefault.titleTextContext);
      updateTitleContext(dataDefault.titleContext);
      updateYearContext(dataDefault.yearContext);
      updateDaysNameContext(dataDefault.daysNameContext);
      updateMonthContext(dataDefault.monthContext);
      updateFirstDayContext(dataDefault.firstDayContext);
      updateHeightContext(dataDefault.heightContext);
  
      updateSelectedFonts(dataDefault.SelectedFonts);
      updateSelectedColors(dataDefault.SelectedColors);
  
      updateColumns(dataDefault.columns);
      updateRows(dataDefault.rows);
      updateTextfields(dataDefault.textfields);
      updateEmojis(dataDefault.emojis);
    } else {
      console.error("dataDefault is undefined or null");
    }
  };
  return (
    <Button sx={{ width: "50%" }} variant="outlined" onClick={handleResetButton}>
      {translate("reset-button")}
    </Button>
  )
}

export default ResetButton;