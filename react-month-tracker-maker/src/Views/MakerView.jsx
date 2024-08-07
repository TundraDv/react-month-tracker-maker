import React from "react";
import { Box, Grid, Container, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../Components/Calendar";
import Picker from "../Components/Picker";
import Navbar from '../Components/Navbar'
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
              <Navbar/>
              <Container
                sx={{
                  // minHeight: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid
                  container
                  spacing={3}
                  direction={isMobile ? 'column' : 'row'}
                  justifyContent="center"
                  alignItems={isMobile ? 'flex-start' : 'stretch'}
                  sx={{
                    minWidth: '300px',
                    marginTop: 1,
                    marginBottom: (theme) => ({
                      xs: theme.spacing(10), // Large bottom margin on extra-small screens (phones)
                      sm: theme.spacing(2)  // Smaller margin on small screens and up
                    }),
                  }}
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
