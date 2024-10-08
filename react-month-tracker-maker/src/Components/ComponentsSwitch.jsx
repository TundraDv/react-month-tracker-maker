import React, { useEffect } from "react";
import dayjs from 'dayjs';
import { Box, Switch, Typography, Stack, Slider, TextField, InputLabel, FormControl, Select, MenuItem, FormControlLabel, FormGroup } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useComponentsContext } from "../Contexts/ComponentsContext";
import { useLanguage } from '../Contexts/LanguageContext';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

function ComponentsSwitch() {
  const {
    titleTextContext,
    daysNameContext,
    titleContext,
    yearContext,
    monthContext,
    firstDayContext,
    dateValueContext,
    heightContext,
    updateDateValueContext,
    updateFirstDayContext,
    updateDaysNameContext,
    updateTitleContext,
    updateYearContext,
    updateTitleTextContext,
    updateMonthContext,
    updateHeightContext
  } = useComponentsContext();

  const { locale, translate, calendarKey } = useLanguage();
  const weekdays = translate("weekdays-full");

  return (
    <Box>
      <FormGroup>
        <FormControl fullWidth>
          <TextField
            id="title-label"
            label={translate("title-name")}
            variant="outlined"
            onChange={(e) => updateTitleTextContext(e.target.value)}
            value={titleTextContext}
          />
        </FormControl>
        <Stack sx={{ marginY: 2 }}>
          <FormControlLabel
            control={<Switch checked={titleContext} onChange={() => updateTitleContext(!titleContext)} name="title" />}
            label={translate("title-label")}
          />
          <FormControlLabel
            control={<Switch checked={yearContext} onChange={() => updateYearContext(!yearContext)} name="year" />}
            label={translate("year-label")}
          />
          <FormControlLabel
            control={<Switch checked={daysNameContext} onChange={() => updateDaysNameContext(!daysNameContext)} name="days" />}
            label={translate("days-label")}
          />
          <FormControlLabel
            control={<Switch checked={monthContext} onChange={() => updateMonthContext(!monthContext)} name="month" />}
            label={translate("month-label")}
          />
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
          <DatePicker
            key={calendarKey}
            views={['year', 'month']}
            label={translate("date-label")}
            minDate={dayjs('2010-01-01')}
            maxDate={dayjs('2050-12-01')}
            value={dateValueContext}
            sx={{ marginY: 2 }}
            onChange={(newValue) => updateDateValueContext(newValue)}
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="first-day-picker-label">{translate("weekday-label")}</InputLabel>
          <Select
            labelId="first-day-picker-label"
            id="first-day-picker"
            value={firstDayContext}
            onChange={(e) => updateFirstDayContext(e.target.value)}
            label={translate("weekday-label")}
          >
            {weekdays.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography sx={{ marginY: 2 }}>
          {translate("height-label")}
        </Typography>
        <Slider
          aria-label="height"
          value={heightContext}
          step={10}
          marks
          min={500}
          max={760}
          valueLabelDisplay="auto"
          onChange={(e, value) => updateHeightContext(value)}
        />
      </FormGroup>
    </Box>
  );
}

export default ComponentsSwitch;
