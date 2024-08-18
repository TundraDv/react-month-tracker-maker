import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTemplateUpdater } from './useTemplateUpdater';
import { useTemplates } from '../Contexts/TemplatesContext';
import { Box, CircularProgress, Typography } from "@mui/material";

function MakerTemplateSetting() {
  const { applyTemplateData } = useTemplateUpdater();
  const { templatesData } = useTemplates();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const dataDefault = templatesData[id];

    if (dataDefault) {
      applyTemplateData(dataDefault, 0);
      navigate('/');
    } else {
      setLoading(false); 
    }
  }, [id, applyTemplateData, templatesData, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F0F0F0',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading template...
        </Typography>
      </Box>
    );
  }
  return null;
}

export default MakerTemplateSetting;
