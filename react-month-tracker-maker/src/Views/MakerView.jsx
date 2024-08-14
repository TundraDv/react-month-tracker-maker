import React from "react";
import { Box, Grid, Container, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import DownloadJsonButton from "../Buttons/DownloadConfigButton";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import { useGoalsContext } from '../Contexts/GoalsContext';

function MakerView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    selectedImageDayShape,
    transparency: transparencyDayShape,
    backgroundColor: backgroundColorDayShape
  } = useDayShapeContext();
  const { selectedImageBackground, transparency, backgroundColor } = useBackgroundImageContext();
  const { titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext } = useComponentsContext();
  const { selectedFonts, selectedColors } = useFontContext();
  const { columns, rows, textfields, emojis } = useGoalsContext();
  const dataTemplate = {
    "selectedImageBackground": selectedImageBackground,
    "transparency": transparency,
    "backgroundColor": backgroundColor,
    "selectedImageDayShape": selectedImageDayShape,
    "transparencyDayShape": transparencyDayShape,
    "backgroundColorDayShape": backgroundColorDayShape,
    "titleTextContext": titleTextContext,
    "titleContext": titleContext,
    "yearContext": yearContext,
    "daysNameContext": daysNameContext,
    "monthContext": monthContext,
    "firstDayContext": firstDayContext,
    "heightContext": heightContext,
    "selectedFonts": selectedFonts,
    "selectedColors": selectedColors,
    "columns": columns,
    "rows": rows,
    "textfields": textfields,
    "emojis": emojis
  };

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
            selectedImageDayShape={selectedImageDayShape} 
            transparencyDayShape={transparencyDayShape}
            backgroundColorDayShape={backgroundColorDayShape}
            selectedImageBackground={selectedImageBackground}
            transparency={transparency}
            backgroundColor={backgroundColor}
            titleTextContext={titleTextContext}
            heightContext={heightContext}
            titleContext={titleContext}
            yearContext={yearContext}
            monthContext={monthContext}
            daysNameContext={daysNameContext}
            firstDayContext={firstDayContext}
            dateValueContext={dateValueContext}
            selectedFonts={selectedFonts}
            selectedColors={selectedColors}
            columns={columns}
            rows={rows}
            textfields={textfields}
            emojis={emojis} 
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
