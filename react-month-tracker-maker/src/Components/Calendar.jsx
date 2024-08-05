import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import Goals from "./Goals";

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function generateDaysArray(month, year) {
  const daysInMonth = getDaysInMonth(month, year);
  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }
  return daysArray;
}

function getStartDayOffset(month, year, startDay) {
  const firstDay = new Date(year, month, 1).getDay();
  return (firstDay - startDay + 7) % 7;
}

function Calendar({ startDay }) {
  const { selectedImageDayShape } = useDayShapeContext();
  const { selectedImageBackground } = useBackgroundImageContext();
  console.log(selectedImageBackground);

  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = generateDaysArray(month, year);
  const startDayOffset = getStartDayOffset(month, year, startDay);

  const rows = [];
  let currentRow = [];

  // Fill the first row with empty cells if necessary
  if (startDayOffset > 0) {
    currentRow = Array(startDayOffset).fill(null);
  }

  // Fill the days
  days.forEach((day, index) => {
    currentRow.push(day);
    if (currentRow.length === 7) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  // Fill the last row with empty cells if necessary to complete the week
  if (currentRow.length > 0) {
    const emptyCells = Array(7 - currentRow.length).fill(null);
    rows.push([...currentRow, ...emptyCells]);
  } else if (rows.length === 0) {
    rows.push(Array(7).fill(null)); // Handle edge case where month starts and ends on the same week
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundImage: selectedImageBackground ? `url(${require(`../Assets/${selectedImageBackground}`)})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h3" sx={{  }}>
        Month Tracker
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        August
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={0} justifyContent="center">
          {/* Day Names Row */}
          <Grid container item xs={12} spacing={0} justifyContent="center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
              <Grid item xs key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="body2">{dayName}</Typography>
              </Grid>
            ))}
          </Grid>
          {/* Calendar Days */}
          {rows.map((row, rowIndex) => (
            <Grid container item key={rowIndex} spacing={0} justifyContent="center">
              {row.map((day, index) => (
                <Grid item xs key={index} sx={{ textAlign: 'center' }}>
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
                          component="img"
                          src={require(`../Assets/${selectedImageDayShape}`)}
                          alt="Background"
                          sx={{
                            position: 'absolute',
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          position: 'relative',
                          color: '#2A7AEF',
                          fontSize: 20,
                          textAlign: 'center',
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
  );
}

export default Calendar;
