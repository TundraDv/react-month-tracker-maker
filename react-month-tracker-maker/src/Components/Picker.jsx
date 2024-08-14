import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Card, Stack } from '@mui/material';
import ComponentsSwitch from './ComponentsSwitch';
import ImagePicker from "./ImagePicker";
import FontPicker from "./FontPicker";
import GoalsPicker from "./GoalsPicker";
import TopImagePicker from "../Components/TopImagePicker";
import { useDayShapeContext } from '../Contexts/DayShapeContext';
import { useBackgroundImageContext } from '../Contexts/BackgroundImageContext';
import { useComponentsContext } from '../Contexts/ComponentsContext';
import ResetButton from "../Components/ResetButton";
import DownloadButton from "../Components/DownloadButton";
import backgroundImages from "../Assets/BackgroundImage/backgroundImages.json";
import daysShapes from "../Assets/DayShape/daysShapes.json";
import { useLanguage } from '../Contexts/LanguageContext';

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

function Picker() {
  const [tab, setTab] = useState(0);
  const { titleTextContext } = useComponentsContext();
  const { translate } = useLanguage();

  const componentNames = translate("tabs-names");

  const componentList = [
    <ComponentsSwitch />,
    <ImagePicker imageData={backgroundImages} cols={3} context={useBackgroundImageContext} />,
    <ImagePicker imageData={daysShapes} cols={3} context={useDayShapeContext} />,
    <GoalsPicker />,
    <FontPicker />,
    <TopImagePicker />,
    "Top Right", // Placeholder if you need something here
    "Top Center" // Placeholder if you need something here
  ];

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: "550px" }, overflow: 'auto' }}>
      <Card sx={{ height: 650, width: { xs: "100%", sm: "550px" }, overflow: 'auto' }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto"
            >
              {componentNames.map((name, index) => (
                <Tab key={index} label={name} value={index} />
              ))}
            </Tabs>
          </Box>
          {componentList.map((component, index) => (
            <CustomTabPanel key={index} value={tab} index={index}>
              {component}
            </CustomTabPanel>
          ))}
        </Box>
      </Card>
      <Stack direction={"row"} spacing={1} margin={1}>
        <ResetButton />
        <DownloadButton id_CardElement="CustomTracker" title={titleTextContext} />
      </Stack>
    </Box>
  );
}

export default Picker;
