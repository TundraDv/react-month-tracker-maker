import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '100%'}}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </Box>
      <Footer />
    </div>
  );
};

export default MainLayout;
