import React from 'react';
import Button from '@mui/material/Button';
import { useLanguage } from '../Contexts/LanguageContext';

const DownloadJsonButton = ( {dataTemplate} ) => {
  const { translate } = useLanguage();
  const downloadJson = () => {
    const jsonString = JSON.stringify(dataTemplate, null, 2); 

    const blob = new Blob([jsonString], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${dataTemplate.titleTextContext}data.json`; 

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button sx={{ width: "50%" }} variant="outlined" color="primary" onClick={downloadJson}>
       {translate("config-button")}
    </Button>
  );
};

export default DownloadJsonButton;
