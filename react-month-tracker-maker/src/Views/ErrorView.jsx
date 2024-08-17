import React from "react";
import { useLanguage } from '../Contexts/LanguageContext';
import { Box } from '@mui/material'

const ErrorView = () => {
  const { translate } = useLanguage();

  return (
  <div>
    <Box sx={{ height: '80vh', margin: 1 }}>
    <h1>{translate("error-h1")}</h1>
    <p>{translate("error-p")}</p>
    </Box>
  </div>

  )
};

export default ErrorView;