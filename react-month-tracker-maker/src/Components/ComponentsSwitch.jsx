import React from "react";
import {Box, Switch, Stack, TextField, InputLabel, FormControl, Select, MenuItem , FormControlLabel, FormGroup } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useComponentsContext } from "../Contexts/ComponentsContext"

function ComponentsSwitch() {
  const { titleTextContext, 
          daysNameContext,
          titleContext, 
          yearContext,
          monthContext,
          firstDayContext,
          dateValueContext,
          updateDateValueContext,
          updateFirstDayContext,
          updateDaysNameContext, 
          updateTitleContext, 
          updateYearContext, 
          updateTitleTextContext,
          updateMonthContext} = useComponentsContext();
  const handleDate = (newValue) => {
    updateDateValueContext(newValue);
  }
  const handleTitle = () => {
    updateTitleContext(!titleContext);
  }
  const handleYear = () => {
    updateYearContext(!yearContext);
  }
  const handleDaysName = () => {
    updateDaysNameContext(!daysNameContext);
  }
  const handleMonthName = () => {
    updateMonthContext(!monthContext);
  }
  const handleTitleText = (event) => {
    updateTitleTextContext(event.target.value);
  }
  const handleFirstDay = (event) => {
    updateFirstDayContext(event.target.value)
  }
  return (
    <Box>
      <FormGroup>
      <FormControl fullWidth>
        <TextField
            id="title-label"
            label="Title Tracker"
            variant="outlined"
            onChange={handleTitleText}
            value={titleTextContext}
          />
          </FormControl>
        <Stack sx={{ marginY: 2}}>
          <FormControlLabel
          control={
            <Switch checked={titleContext} onChange={handleTitle} name="title" /> }
          label="Show title" />
          <FormControlLabel
            control={
          <Switch checked={yearContext} onChange={handleYear} name="year" />}
          label="Show year" />
          <FormControlLabel
            control={
          <Switch checked={daysNameContext} onChange={handleDaysName} name="days" />}
          label="Show days names" />
          <FormControlLabel
            control={
          <Switch checked={monthContext} onChange={handleMonthName} name="month" />}
          label="Show month name" />
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              views={['year', 'month']}
              label="Year and Month"
              minDate={dayjs('2010-01-01')}
              maxDate={dayjs('2050-12-01')}
              value={dateValueContext}
              sx={{ marginY: 2 }}
              onChange={handleDate}
              renderInput={(params) => <TextField {...params} helperText={null} />}
              />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="first-day-picker-label">First Day of the Week</InputLabel>
          <Select
            labelId="first-day-picker-label"
            id="first-day-picker"
            value={firstDayContext}
            onChange={handleFirstDay}
            label="First Day of the Week"
          >
            <MenuItem value={0}>Monday</MenuItem>
            <MenuItem value={1}>Tuesday</MenuItem>
            <MenuItem value={2}>Wednesday</MenuItem>
            <MenuItem value={3}>Thursday</MenuItem>
            <MenuItem value={4}>Friday</MenuItem>
            <MenuItem value={5}>Saturday</MenuItem>
            <MenuItem value={6}>Sunday</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </Box>
  )
}

export default ComponentsSwitch;