import React from 'react';
import { useTemplates } from '../Contexts/TemplatesContext';
import { useNavigate } from 'react-router-dom';
import { useTemplateUpdater } from '../Utils/useTemplateUpdater'; // Import the custom hook
import { Button } from '@mui/material';
import { useLanguage } from '../Contexts/LanguageContext';

const SettingTemplateButton = ({ index, actionType }) => {
  const navigate = useNavigate();
  const { templatesData } = useTemplates();
  const dataDefault = actionType === 'reset' ? templatesData[0] : templatesData[index];
  const { translate } = useLanguage();
  const { applyTemplateData } = useTemplateUpdater(); // Use the custom hook

  const handleClick = () => {
    if (!dataDefault) {
      console.error("dataDefault is undefined or null");
      return;
    }
  
    if (!['edit', 'fill', 'reset'].includes(actionType)) {
      console.error(`Invalid actionType: ${actionType}`);
      return;
    }
  
    let tabIndex;
    switch (actionType) {
      case 'edit':
        tabIndex = 0;
        break;
      case 'fill':
        tabIndex = 6;
        break;
      case 'reset':
        tabIndex = 0; 
        break;
      default:
        console.error(`Unexpected actionType: ${actionType}`);
        return;
    }
    applyTemplateData(dataDefault, tabIndex);
    navigate(`/maker/templates/${index}`);
  };
  

  return (
    <Button sx={{ width: "50%" }} variant="outlined" onClick={handleClick}>
      {translate(`${actionType}-button`)}
    </Button>
  );
};

export default SettingTemplateButton;
