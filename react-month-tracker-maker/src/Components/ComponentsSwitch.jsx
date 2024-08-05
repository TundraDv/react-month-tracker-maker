import React, {useState} from "react";
import {Box, Switch, TextField, FormControlLabel, FormGroup } from "@mui/material"

function ComponentsSwitch() {
  const [titleText, setTitleText] = useState("Step Tracker");
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
  const handleTitleText = (newValue) => {
    setTitleText(newValue);
  }
  return (
    <Box>
      <FormGroup>
      <TextField
              key={title}
              id="title"
              variant="outlined"
              onChange={handleTitleText}
              defaultValue={titleText}
            />
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
      Pick First Day of the week
      Pick Month 
      Pick Year
    </FormGroup>
    </Box>
  )
}

export default ComponentsSwitch;