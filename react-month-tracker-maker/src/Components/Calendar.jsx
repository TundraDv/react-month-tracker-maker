import React from "react";
import Grid from '@mui/material/Grid';
import chroma from "chroma-js";
import { Typography, Card, Box } from '@mui/material';
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import { useFontContext } from "../Contexts/FontContext";
import Goals from "./Goals";

function generateDaysArray(selectedDate) {
  const daysInMonth = selectedDate.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

function getStartDayOffset(selectedDate, startDay) {
  const firstDay = selectedDate.startOf('month').day();
  return (firstDay - startDay + 7) % 7;
}

function getWeekDays(startDay) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return [...days.slice(startDay), ...days.slice(0, startDay)];
}

function Calendar() {
  const {
    selectedImageDayShape,
    transparency: transparencyDayShape,
    backgroundColor: backgroundColorDayShape
  } = useDayShapeContext();
  const { selectedImageBackground, transparency, backgroundColor } = useBackgroundImageContext();
  const { titleTextContext, heightContext, titleContext, yearContext, monthContext, daysNameContext, firstDayContext, dateValueContext } = useComponentsContext();
  const { selectedFonts, selectedColors } = useFontContext();
  
  const rgbaColor = chroma(backgroundColor).alpha(transparency).rgba();
  const rgbaColorDayShape = chroma(backgroundColorDayShape).alpha(transparencyDayShape).rgba();

  const days = generateDaysArray(dateValueContext);
  const startDayOffset = getStartDayOffset(dateValueContext, firstDayContext);

  const rows = [];
  let currentRow = [];

  if (startDayOffset > 0) {
    currentRow = Array(startDayOffset).fill(null);
  }

  days.forEach((day, index) => {
    currentRow.push(day);
    if (currentRow.length === 7) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  if (currentRow.length > 0) {
    const emptyCells = Array(7 - currentRow.length).fill(null);
    rows.push([...currentRow, ...emptyCells]);
  } else if (rows.length === 0) {
    rows.push(Array(7).fill(null)); // Handle edge case where month starts and ends on the same week
  }

  const weekdays = getWeekDays(firstDayContext);

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
      id="CustomTracker"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundImage: selectedImageBackground ? 
          `linear-gradient(rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]}), rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]})), url(${require(`../Assets/${selectedImageBackground}`)})` 
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {titleContext ? (
        <Typography variant="h3" sx={{ mb: 2, fontFamily: selectedFonts[0], color: selectedColors[0] }}>
          {titleTextContext}
        </Typography>
      ) : null }
      {monthContext ? (
        <Typography variant="h4" sx={{ mb: 2, fontFamily: selectedFonts[1], color: selectedColors[1] }}>
          {dateValueContext.format('MMMM')}
        </Typography>
      ) : null }
      {yearContext ? (
        <Typography variant="body1" sx={{ mb: 2, fontFamily: selectedFonts[2], color: selectedColors[2] }}>
          {dateValueContext.format('YYYY')}
        </Typography>
      ) : null}
      <Box sx={{ width: '100%', margin: 2 }}>
      <Grid container spacing={0} justifyContent="center">
          <Grid container item xs={12} spacing={0} justifyContent="center">
            {daysNameContext ? (
              weekdays.map((dayName, index) => (
                <Grid item xs key={index} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontFamily: selectedFonts[3], color: selectedColors[3] }}>
                    {dayName}
                  </Typography>
                </Grid>
              ))
            ) : null}
          </Grid>
          {rows.map((row, rowIndex) => (
            <Grid container item key={rowIndex} spacing={0.5} justifyContent="center">
              {row.map((day, index) => (
                <Grid item xs key={index} sx={{ textAlign: 'center', minWidth: 50 }}>
                  {day === null ? (
                    <Typography variant="body1"></Typography>
                  ) : (
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
                            objectFit: 'contain',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: rgbaColorDayShape ? `rgba(${rgbaColorDayShape[0]}, ${rgbaColorDayShape[1]}, ${rgbaColorDayShape[2]}, ${rgbaColorDayShape[3]})` : 'transparent',
                            maskImage: `url(${require(`../Assets/${selectedImageDayShape}`)})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          position: 'relative',
                          fontFamily: selectedFonts[4],
                          color: selectedColors[4],
                          fontSize: 20,
                          textAlign: 'center',
                          zIndex: 1, //text above image
                        }}
                      >
                        {day}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Goals />
    </Box>
    </Card>
  );
}

export default Calendar;
