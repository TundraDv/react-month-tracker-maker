import React from "react";
import { Box, Stack, Card } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import { DayShapeProvider } from '../Contexts/DayShapeContext';
import { BackgroundImageProvider } from '../Contexts/BackgroundImageContext';
import { GoalsProvider } from '../Contexts/GoalsContext';
import { ComponentsProvider } from '../Contexts/ComponentsContext';
import { FontProvider } from '../Contexts/FontContext';

function MakerView() {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <DayShapeProvider>
        <BackgroundImageProvider>
          <GoalsProvider>
           <ComponentsProvider>
            <FontProvider>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="stretch">
                <Card sx={{ height: "70vh", width: "400px", display: 'flex', alignItems: 'stretch'  }}>
                  <Calendar startDay={0} />
                </Card>
                <Card
                  sx={{
                    height: "70vh",
                    width: "550px",
                    overflow: 'auto',
                  }}
                  >
                  <Picker />
                </Card>
              </Stack>
              </FontProvider>
            </ComponentsProvider> 
          </GoalsProvider>
        </BackgroundImageProvider>
      </DayShapeProvider>
    </Box>
  );
}

export default MakerView;
