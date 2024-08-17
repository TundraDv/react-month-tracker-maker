import { useCallback } from 'react';
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from '../Contexts/FontContext';
import { useGoalsContext } from '../Contexts/GoalsContext';

export const useTemplateUpdater = () => {
  const { updateSelectedId,
          updateSelectedLocalImage, 
          updateSelectedImage, 
          updateTransparency, 
          updateBackgroundColor } = useBackgroundImageContext();
  const { updateSelectedId: updateSelectedIdDayShape,
          updateSelectedLocalImage: updateSelectedLocalImageDayShape, 
          updateSelectedImage: updateSelectedImageDayShape, 
          updateTransparency: updateTransparencyDayShape, 
          updateBackgroundColor: updateBackgroundColorDayShape } = useDayShapeContext();
  const { updatePickerTab, 
          updateTitleTextContext, 
          updateTitleContext, 
          updateYearContext, 
          updateDaysNameContext, 
          updateMonthContext, 
          updateFirstDayContext, 
          updateHeightContext } = useComponentsContext();
  const { updateSelectedFonts, 
          updateSelectedColors,
          updateBoldSettings, 
          updateItalicSettings, 
          updateFontSizes} = useFontContext();
  const { updateColumns, updateRows, updateTextfields, updateEmojis, updateFillingEmojis } = useGoalsContext();

  const applyTemplateData = useCallback((data, tabIndex) => {
    if (data) {
      updateSelectedId(data.selectedId);
      updateSelectedIdDayShape(data.selectedIdDayShape);
      

      updateSelectedLocalImage(null);
      updateSelectedImage(data.selectedImageBackground);
      updateTransparency(data.transparency);
      updateBackgroundColor(data.backgroundColor);

      updateSelectedLocalImageDayShape(null);
      updateSelectedImageDayShape(data.selectedImageDayShape);
      updateTransparencyDayShape(data.transparencyDayShape);
      updateBackgroundColorDayShape(data.backgroundColorDayShape);

      updatePickerTab(tabIndex);
      updateTitleTextContext(data.titleTextContext);
      updateTitleContext(data.titleContext);
      updateYearContext(data.yearContext);
      updateDaysNameContext(data.daysNameContext);
      updateMonthContext(data.monthContext);
      updateFirstDayContext(data.firstDayContext);
      updateHeightContext(data.heightContext);

      updateSelectedFonts(data.selectedFonts);
      updateSelectedColors(data.selectedColors);
      updateBoldSettings(data.boldSettings);
      updateItalicSettings(data.italicSettings);
      updateFontSizes(data.fontSizes);

      updateColumns(data.columns);
      updateRows(data.rows);
      updateTextfields(data.textfields);
      updateEmojis(data.emojis);
      updateFillingEmojis(Array(24).fill(""));
    } else {
      console.error("data is undefined or null");
    }
  }, [
    updateSelectedId, updateSelectedIdDayShape, updateBoldSettings, updateItalicSettings, updateFontSizes, updateSelectedLocalImage, updateSelectedImage, updateTransparency, updateBackgroundColor,
    updateSelectedLocalImageDayShape, updateSelectedImageDayShape, updateTransparencyDayShape, updateBackgroundColorDayShape,
    updatePickerTab, updateTitleTextContext, updateTitleContext, updateYearContext, updateDaysNameContext, updateMonthContext, updateFirstDayContext, updateHeightContext,
    updateSelectedFonts, updateSelectedColors, updateColumns, updateRows, updateTextfields, updateEmojis, updateFillingEmojis
  ]);

  return { applyTemplateData };
};
