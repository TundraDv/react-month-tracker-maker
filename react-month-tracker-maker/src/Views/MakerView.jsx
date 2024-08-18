import React, { useMemo} from "react";
import { Grid, Stack,Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import DownloadJsonButton from "../Buttons/DownloadConfigButton";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import { useGoalsContext } from '../Contexts/GoalsContext';
import ImportConfigButton from "../Buttons/ImportConfigButton"

function MakerView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { selectedId: selectedIdDayShape, imageLocalData: imageLocalDataDayShape, selectedLocalImage: selectedLocalImageDayShape, selectedImageDayShape, transparency: transparencyDayShape, backgroundColor: backgroundColorDayShape } = useDayShapeContext();
  const { selectedId, imageLocalData: imageLocalDataBackground, selectedLocalImage: selectedLocalImageBackground, selectedImageBackground, transparency, backgroundColor } = useBackgroundImageContext();
  const { titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext } = useComponentsContext();
  const { selectedFonts, selectedColors, boldSettings, italicSettings, fontSizes } = useFontContext();
  const { columns, rows, textfields, emojis, fillingEmojis, emojiSize } = useGoalsContext();

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
      fillingEmojis,
      selectedColors,
      boldSettings, 
      italicSettings, 
      fontSizes,
      columns,
      rows,
      textfields,
      emojis
    };
  }, [
    selectedId, boldSettings, italicSettings, fontSizes, selectedIdDayShape, selectedImageBackground, transparency, backgroundColor,
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
      boldSettings, 
      italicSettings, 
      fontSizes,
      imageLocalDataBackground,
      selectedLocalImageBackground,
      imageLocalDataDayShape,
      selectedLocalImageDayShape
    };
  }, [
    selectedImageDayShape, boldSettings, italicSettings, fontSizes, transparencyDayShape, backgroundColorDayShape, selectedImageBackground, transparency, backgroundColor,
    titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext,
    columns, rows, textfields, emojis, fillingEmojis, emojiSize, selectedFonts, selectedColors,
    imageLocalDataBackground, selectedLocalImageBackground, imageLocalDataDayShape, selectedLocalImageDayShape
  ]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Grid
        container
        spacing={1}
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
          justifyContent='center'
          alignItems="center"
          sx={{ minWidth: '300px' }}
        >
          <Picker />
          <Box sx={{ width: { xs: "100%", sm: "550px" }, overflow: 'auto' }}>
            <Stack direction={"row"} spacing={1} margin={1}>
              <DownloadJsonButton dataTemplate={dataTemplate}/>
              <ImportConfigButton />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MakerView;
