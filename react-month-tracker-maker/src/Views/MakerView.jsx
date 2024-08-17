import React, { useEffect, useRef, useMemo } from "react";
import { Box, Grid, Container, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import DownloadJsonButton from "../Buttons/DownloadConfigButton";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import { useGoalsContext } from '../Contexts/GoalsContext';
import { useTemplates } from '../Contexts/TemplatesContext'; 
import { useParams } from 'react-router-dom';
import { useTemplateUpdater } from '../Utils/useTemplateUpdater';

function MakerView() {
  const { applyTemplateData } = useTemplateUpdater();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { templatesData } = useTemplates();
  
  const { selectedId: selectedIdDayShape, imageLocalData: imageLocalDataDayShape, selectedLocalImage: selectedLocalImageDayShape, selectedImageDayShape, transparency: transparencyDayShape, backgroundColor: backgroundColorDayShape } = useDayShapeContext();
  const { selectedId, imageLocalData: imageLocalDataBackground, selectedLocalImage: selectedLocalImageBackground, selectedImageBackground, transparency, backgroundColor } = useBackgroundImageContext();
  const { titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext } = useComponentsContext();
  const { selectedFonts, selectedColors } = useFontContext();
  const { columns, rows, textfields, emojis, fillingEmojis, emojiSize } = useGoalsContext();
  const { id } = useParams();

  const hasAppliedTemplateRef = useRef(false); // Ref to track if applyTemplateData has been called

  const dataTemplate = useMemo(() => {
    return {
      selectedId,
      selectedIdDayShape,
      selectedImageBackground,
      transparency,
      backgroundColor,
      selectedImageDayShape,
      transparencyDayShape,
      backgroundColorDayShape,
      titleTextContext,
      titleContext,
      yearContext,
      daysNameContext,
      monthContext,
      firstDayContext,
      heightContext,
      selectedFonts,
      selectedColors,
      columns,
      rows,
      textfields,
      emojis
    };
  }, [
    selectedId, selectedIdDayShape, selectedImageBackground, transparency, backgroundColor,
    selectedImageDayShape, transparencyDayShape, backgroundColorDayShape,
    titleTextContext, titleContext, yearContext, daysNameContext, monthContext, firstDayContext, heightContext,
    selectedFonts, selectedColors, columns, rows, textfields, emojis
  ]);

  const calendarData = useMemo(() => {
    return {
      selectedImageDayShape,
      transparencyDayShape,
      backgroundColorDayShape,
      selectedImageBackground,
      transparency,
      backgroundColor,
      titleTextContext,
      heightContext,
      titleContext,
      yearContext,
      monthContext,
      daysNameContext,
      firstDayContext,
      dateValueContext,
      columns,
      rows,
      textfields,
      emojis,
      fillingEmojis,
      emojiSize,
      selectedFonts,
      selectedColors,
      imageLocalDataBackground,
      selectedLocalImageBackground,
      imageLocalDataDayShape,
      selectedLocalImageDayShape
    };
  }, [
    selectedImageDayShape, transparencyDayShape, backgroundColorDayShape, selectedImageBackground, transparency, backgroundColor,
    titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext,
    columns, rows, textfields, emojis, fillingEmojis, emojiSize, selectedFonts, selectedColors,
    imageLocalDataBackground, selectedLocalImageBackground, imageLocalDataDayShape, selectedLocalImageDayShape
  ]);

  useEffect(() => {
    if (id && templatesData[id] && !hasAppliedTemplateRef.current) {
      applyTemplateData(templatesData[id], 0);
      hasAppliedTemplateRef.current = true; // Mark as applied
    }
  }, [id, templatesData, applyTemplateData]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={3}
        direction={isMobile ? 'column' : 'row'}
        justifyContent="center"
        alignItems={isMobile ? 'flex-start' : 'stretch'}
        sx={{
          minWidth: '300px',
          marginTop: 1,
          marginBottom: (theme) => ({
            xs: theme.spacing(10),
            sm: theme.spacing(2) 
          }),
        }}
      >
        <Grid
          item
          xs={5}
          key={0}
          container
          justifyContent={isMobile ? 'center' : 'flex-end'}
          alignItems="center"
          sx={{ minWidth: '300px' }}
        >
          <Calendar 
            data={calendarData}
          />
        </Grid>
        <Grid
          item
          xs={7}
          key={1}
          container
          justifyContent={isMobile ? 'center' : 'flex-start'}
          alignItems="center"
          sx={{ minWidth: '300px' }}
        >
          <Picker />
          <DownloadJsonButton dataTemplate={dataTemplate}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MakerView;
