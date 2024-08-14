import React from 'react';
import Calendar from '../Components/Calendar';
import { useTemplates } from '../Contexts/TemplatesContext'; 
import { Box, Stack, Grid } from '@mui/material';
import SettingTemplateButton from '../Buttons/SettingTemplateButton';
import DownloadButton from '../Buttons/DownloadButton';

function TemplatesView() {
  const { templatesData } = useTemplates(); 

  return (
    <Box sx={{ backgroundColor: '#f0f0f0' }}>
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {templatesData.map((item, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={index} 
            sx={{ 
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center', 
              margin: 1, 
              minWidth: { xs: '90%', sm: '400px' } 
            }}
          >
            <Calendar 
              selectedImageDayShape={item.selectedImageDayShape} 
              transparencyDayShape={item.transparencyDayShape}
              backgroundColorDayShape={item.backgroundColorDayShape}
              selectedImageBackground={item.selectedImageBackground}
              transparency={item.transparency}
              backgroundColor={item.backgroundColor}
              titleTextContext={item.titleTextContext}
              heightContext={item.heightContext}
              titleContext={item.titleContext}
              yearContext={item.yearContext}
              monthContext={item.monthContext}
              daysNameContext={item.daysNameContext}
              firstDayContext={item.firstDayContext}
              selectedFonts={item.selectedFonts}
              selectedColors={item.selectedColors}
              columns={item.columns}
              rows={item.rows}
              textfields={item.textfields}
              emojis={item.emojis} 
              indexCard={index}
            />
            <Stack 
              direction={"row"} 
              spacing={1} 
              sx={{ 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginY: 1, 
                width: '100%' 
              }}
            >
              <SettingTemplateButton index={index} actionType='edit' />
              <DownloadButton id_CardElement={`CustomTracker-${index}`} title={item.titleTextContext} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TemplatesView;
