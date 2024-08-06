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
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        width: '100wh', 
      }}
    >
      <DayShapeProvider>
        <BackgroundImageProvider>
          <GoalsProvider>
            <ComponentsProvider>
              <FontProvider>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  alignItems="stretch"
                  sx={{
                    width: '100%', 
                    maxWidth: 1000, // Set a maximum width for centering
                    mx: 'auto', // Center the Stack horizontally
                    m: 1, // Margin around Stack
                  }}
                >
                  <Card
                    sx={{
                      height: { xs: "50vh", sm: "70vh" },
                      width: { xs: "100%", sm: "400px" },
                      display: 'flex',
                      alignItems: 'stretch',
                      m: 1,
                    }}
                  >
                    <Calendar />
                  </Card>
                  <Card
                    sx={{
                      height: { xs: "50vh", sm: "70vh" },
                      width: { xs: "100%", sm: "550px" },
                      overflow: 'auto',
                      m: 1,
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
