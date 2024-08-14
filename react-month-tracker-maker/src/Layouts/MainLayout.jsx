import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material'
import Navbar from '../Components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '100vh'}}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </Box>
    </div>
  );
};

export default MainLayout;
