import React, {useState} from "react";
import {Box, Switch, FormControlLabel, FormGroup } from "@mui/material"

function ComponentsSwitch() {
  const [title, setTitle] = useState(true);
  const [year, setYear] = useState(true);
  const [daysName, setdaysName] = useState(true);
  const [monthName, setMonthName] = useState(true);
  const handleTitle = () => {
    setTitle(!title);
  }
  const handleYear = () => {
    setYear(!year);
  }
  const handleDaysName = () => {
    setdaysName(!daysName);
  }
  const handleMonthName = () => {
    setMonthName(!monthName);
  }
  return (
    <Box>
      <FormGroup>
      <FormControlLabel
        control={
        <Switch checked={title} onChange={handleTitle} name="title" /> }
      label="Show title" />
      <FormControlLabel
        control={
      <Switch checked={year} onChange={handleYear} name="year" />}
      label="Show year" />
      <FormControlLabel
        control={
      <Switch checked={daysName} onChange={handleDaysName} name="days" />}
      label="Show days names" />
      <FormControlLabel
        control={
      <Switch checked={monthName} onChange={handleMonthName} name="month" />}
      label="Show month name" />
    </FormGroup>
    </Box>
  )
}

export default ComponentsSwitch;