import React, {useState, useContext} from "react";
import PropTypes from 'prop-types';
import {Tabs, Tab, Box} from '@mui/material';
import ComponentsSwitch from './ComponentsSwitch';
import ImagePicker from "./ImagePicker";
import FontPicker from "./FontPicker";
import GoalsPicker from "./GoalsPicker"
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';

import backgroundImages from "../Assets/BackgroundImage/backgroundImages.json"
import daysShapes from "../Assets/DayShape/daysShapes.json"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Picker() {
  const [value, setValue] = useState(3);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ComponentsPickers = {
    "Components": <ComponentsSwitch/>,
    "Background": <ImagePicker imageData={backgroundImages} cols={3} context={useBackgroundImageContext} />,
    "Days Shape": <ImagePicker imageData={daysShapes} cols={3} context={useDayShapeContext} />,
    "Goals": <GoalsPicker />,
    "Top Left": "Top Left",
    "Top Right": "Top Right",
    "Top Center": "Top Center",
    "Bottom Left": "Bottom Left",
    "Bottom Right": "Bottom Right",
    "Bottom Center": "Bottom Center",
    "Days Font": "Days Font",
    "Day Name Font": "Days Name Font",
    "Month Font": "Month Font",
    "Title Font": "Title Font",
    "Year Font": "Year Font",
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto"
        >
          {Object.keys(ComponentsPickers).map((key, index) => (
            <Tab key={index} label={key} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {Object.keys(ComponentsPickers).map((key, index) => (
        <CustomTabPanel key={key} value={value} index={index}>
          {ComponentsPickers[key]}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default Picker;