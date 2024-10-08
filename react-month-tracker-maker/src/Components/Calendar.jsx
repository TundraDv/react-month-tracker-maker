import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import chroma from "chroma-js";
import dayjs from 'dayjs';
import { Typography, Card, Box } from '@mui/material';
import { useLanguage } from '../Contexts/LanguageContext';
import { hexToCSSFilter } from 'hex-to-css-filter';
import Goals from "./Goals";
import 'dayjs/locale/es';
import 'dayjs/locale/en';

function generateDaysArray(selectedDate) {
  const daysInMonth = selectedDate.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

function getStartDayOffset(selectedDate, startDay) {
  const firstDay = selectedDate.startOf('month').day();
  return (firstDay - startDay + 6) % 7;
}

function getWeekDays(startDay, weekdays) {
  return [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
}

function Calendar({ data }) {
  const {
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
    dateValueContext = dayjs(),
    columns,
    rows,
    textfields,
    emojis,
    fillingEmojis = Array(24).fill(""),
    emojiSize = 15,
    selectedFonts,
    selectedColors,
    boldSettings,
    italicSettings,
    fontSizes,
    imageLocalDataBackground = [],
    selectedLocalImageBackground = null,
    imageLocalDataDayShape = [],
    selectedLocalImageDayShape = null,
    indexCard = 0
  } = data;
  const selectedFontsLength = selectedFonts.length;
  const goalsSelectedFonts=selectedFonts[selectedFontsLength-2];
  const goalsSelectedColors=selectedColors[selectedFontsLength-2];
  const goalsBoldSettings=boldSettings[selectedFontsLength-2];
  const goalsItalicSettings=italicSettings[selectedFontsLength-2];
  const goalsFontSizes=fontSizes[selectedFontsLength-2];

  const goalsSettings = {
    columns,
    rows, 
    textfields,
    emojis,
    goalsSelectedFonts,
    goalsSelectedColors,
    goalsBoldSettings,
    goalsItalicSettings,
    goalsFontSizes
  }

  const { locale, translate } = useLanguage();

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  const rgbaColor = chroma(backgroundColor).alpha(transparency).rgba();
  const days = generateDaysArray(dateValueContext);
  const startDayOffset = getStartDayOffset(dateValueContext, firstDayContext);

  const rowsCalendar = [];
  let currentRow = [];

  if (startDayOffset > 0) {
    currentRow = Array(startDayOffset).fill(null);
  }

  let imgUrlBackground = selectedImageBackground ? `linear-gradient(rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]}), rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]})), url(${require(`../Assets/${selectedImageBackground}`)})` : 'none';
  if (selectedLocalImageBackground !== null) {
    imgUrlBackground = `linear-gradient(
      rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]}),
      rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]})
    ), url(${imageLocalDataBackground[selectedLocalImageBackground]})`;
  }

  let imgUrlDayShape = selectedImageDayShape ? `url(${require(`../Assets/${selectedImageDayShape}`)})` : 'none';
  if (selectedLocalImageDayShape !== null) {
    imgUrlDayShape = `url(${imageLocalDataDayShape[selectedLocalImageDayShape]})`;
  }
  
  const weekdays = getWeekDays(firstDayContext, translate("weekdays"));

  days.forEach((day, index) => {
    currentRow.push(day);
    if (currentRow.length === 7) {
      rowsCalendar.push(currentRow);
      currentRow = [];
    }
  });

  if (currentRow.length > 0) {
    const emptyCells = Array(7 - currentRow.length).fill(null);
    rowsCalendar.push([...currentRow, ...emptyCells]);
  } else if (rowsCalendar.length === 0) {
    rowsCalendar.push(Array(7).fill(null));
  }

  return (
    <Card
      sx={{
        height: { xs: heightContext, sm: heightContext },
        minWidth: { xs: "100%", sm: "400px" },
        width: { xs: "100%", sm: "400px" },
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Box
        id={`CustomTracker-${indexCard}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundImage: imgUrlBackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {titleContext && (
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              fontFamily: selectedFonts[0],
              color: selectedColors[0],
              fontWeight: boldSettings[0] ? 'bold' : 'normal',
              fontStyle: italicSettings[0] ? 'italic' : 'normal',
              fontSize: fontSizes[0],
              textAlign: 'center',
              lineHeight: 1.2, // Adjust line height for better fit
              whiteSpace: 'nowrap', // Prevent text wrapping
              // overflow: 'hidden', // Hide overflow
              // textOverflow: 'ellipsis', // Add ellipsis if needed
            }}
          >
            {titleTextContext}
          </Typography>
        )}
        {monthContext && (
          <Typography variant="h4" 
          sx={{ mb: 2, 
                fontFamily: selectedFonts[1], 
                color: selectedColors[1],
                fontWeight: boldSettings[1] ? 'bold' : 'normal',
                fontStyle: italicSettings[1] ? 'italic' : 'normal',
                fontSize: fontSizes[1],
                textAlign: 'center' }}>
            {dateValueContext.locale(locale).format('MMMM')}
          </Typography>
        )}
        {yearContext && (
          <Typography variant="body1"
          sx={{ mb: 2, 
            fontFamily: selectedFonts[2], 
            color: selectedColors[2],
            fontWeight: boldSettings[2] ? 'bold' : 'normal',
            fontStyle: italicSettings[2] ? 'italic' : 'normal',
            fontSize: fontSizes[2],
            textAlign: 'center' }}>
            {dateValueContext.locale(locale).format('YYYY')}
          </Typography>
        )}
        <Box sx={{ width: '100%', margin: 2 }}>
          <Grid container spacing={0} justifyContent="center">
            <Grid container item xs={12} spacing={0} justifyContent="center">
              {daysNameContext && weekdays.map((dayName, index) => (
                <Grid item xs={1} key={index} sx={{ textAlign: 'center', minWidth: 50, boxSizing: 'border-box' }}>
                  <Typography variant="body2" 
                    sx={{ mb: 1, 
                      fontFamily: selectedFonts[3], 
                      color: selectedColors[3],
                      fontWeight: boldSettings[3] ? 'bold' : 'normal',
                      fontStyle: italicSettings[3] ? 'italic' : 'normal',
                      fontSize: fontSizes[3],
                      textAlign: 'center' }}>
                    {dayName}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {rowsCalendar.map((row, rowIndex) => (
              <Grid container item key={rowIndex} spacing={0} justifyContent="center">
                {row.map((day, index) => (
                  <Grid item xs={1} key={index} sx={{ textAlign: 'center', minWidth: 50, boxSizing: 'border-box' }}>
                    {day !== null && (
                      <Box
                        sx={{
                          position: 'relative',
                          width: 50,
                          height: 50,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        {selectedImageDayShape && (
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '80%',
                              height: '80%',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              backgroundImage: imgUrlDayShape,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              filter: hexToCSSFilter(backgroundColorDayShape).filter,
                              opacity: transparencyDayShape,
                              zIndex: 0,
                            }}
                          />
                        )}
                        <Typography
                          sx={{
                            position: 'relative',
                            fontFamily: selectedFonts[4], 
                            color: selectedColors[4],
                            fontWeight: boldSettings[4] ? 'bold' : 'normal',
                            fontStyle: italicSettings[4] ? 'italic' : 'normal',
                            fontSize: fontSizes[4],
                            textAlign: 'center',
                            zIndex: 1,
                            opacity: 1, 
                          }}
                        >
                          {day}
                        </Typography>
                        {fillingEmojis[day - 1] && (
                          <Typography
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              fontSize: emojiSize,
                              zIndex: 2,
                              opacity: 1,
                            }}
                          >
                            {fillingEmojis[day - 1]}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Goals 
          goalsSettings = {goalsSettings}
        />
      </Box>
    </Card>
  );
}

export default Calendar;
