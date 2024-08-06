import React from "react";
import { Box, Grid,Container, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import { DayShapeProvider } from '../Contexts/DayShapeContext';
import { BackgroundImageProvider } from '../Contexts/BackgroundImageContext';
import { GoalsProvider } from '../Contexts/GoalsContext';
import { ComponentsProvider } from '../Contexts/ComponentsContext';
import { FontProvider } from '../Contexts/FontContext';

function MakerView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <DayShapeProvider>
        <BackgroundImageProvider>
          <GoalsProvider>
            <ComponentsProvider>
              <FontProvider>
              <Container
                sx={{
                  minHeight: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>

                <Grid 
                  container 
                  spacing={3} 
                  direction={isMobile ? 'column' : 'row'}
                  justifyContent="center"
                  alignItems={isMobile ? 'flex-start' : 'stretch'}
                  sx={{ minWidth: '300px', marginTop: 2 }} // Set minimum width for Grid container
                >
                  <Grid 
                    item 
                    xs={5} 
                    key={0} 
                    container
                    justifyContent={isMobile ? 'center' : 'flex-end'}
                    alignItems="center"
                    sx={{ minWidth: '300px' }} 
                  >
                    <Calendar /> 
                  </Grid>
                  <Grid 
                    item 
                    xs={7} 
                    key={1} 
                    container
                    justifyContent={isMobile ? 'center' : 'flex-start'}
                    alignItems="center"
                    sx={{ minWidth: '300px' }}
                    >
                    <Picker />
                  </Grid>
                </Grid>
                    </Container>
              </FontProvider>
            </ComponentsProvider>
          </GoalsProvider>
        </BackgroundImageProvider>
      </DayShapeProvider>
  );
}

export default MakerView;
