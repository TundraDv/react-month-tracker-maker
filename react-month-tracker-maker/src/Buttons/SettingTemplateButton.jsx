import React from "react";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import { useGoalsContext } from '../Contexts/GoalsContext';
import { useLanguage } from '../Contexts/LanguageContext';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useTemplates } from "../Contexts/TemplatesContext";

const SettingTemplateButton = ({ index, actionType }) => {
  const navigate = useNavigate();
  const { templatesData } = useTemplates();
  const dataDefault = actionType === 'reset' ? templatesData[0] : templatesData[index];
  
  const { updateSelectedLocalImage, updateSelectedImage, updateTransparency, updateBackgroundColor } = useBackgroundImageContext();
  const { updateSelectedLocalImage: updateSelectedLocalImageDayShape, updateSelectedImage: updateSelectedImageDayShape, updateTransparency: updateTransparencyDayShape, updateBackgroundColor: updateBackgroundColorDayShape } = useDayShapeContext();
  const { updateTitleTextContext, updateTitleContext, updateYearContext, updateDaysNameContext, updateMonthContext, updateFirstDayContext, updateHeightContext } = useComponentsContext();
  const { updateSelectedFonts, updateSelectedColors } = useFontContext();
  const { updateColumns, updateRows, updateTextfields, updateEmojis, updateFillingEmojis } = useGoalsContext();
  const { translate } = useLanguage();

  const handleClick = () => {
    if (dataDefault) {
      updateSelectedLocalImage(null);
      updateBackgroundColorDayShape(null);
      updateFillingEmojis(Array(24).fill(""));

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

      updateSelectedFonts(dataDefault.selectedFonts);
      updateSelectedColors(dataDefault.selectedColors);

      updateColumns(dataDefault.columns);
      updateRows(dataDefault.rows);
      updateTextfields(dataDefault.textfields);
      updateEmojis(dataDefault.emojis);

      if (actionType === 'edit') {
        navigate('/');
      }
    } else {
      console.error("dataDefault is undefined or null");
    }
  };

  return (
    <Button sx={{ width: "50%" }} variant="outlined" onClick={handleClick}>
      {translate(actionType === 'edit' ? "edit-button" : "reset-button")}
    </Button>
  );
};

export default SettingTemplateButton;
