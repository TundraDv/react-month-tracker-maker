import React from 'react';
import { Box,Button, Typography, Grid,  Container } from '@mui/material';
import logo from '../Assets/watashiwasta-bgremoved.png'; 
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../Contexts/LanguageContext';

function Footer() {
  const {translate } = useLanguage();
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
  }

  return (
    <Box
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
      <Grid 
          container 
          spacing={4} 
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <img src={logo} alt="Company Logo" style={{ height: 50, marginRight: '10px' }} />
              <Typography variant="h6" noWrap>
                Star! Month Tracker Maker
              </Typography>
            </Box>
          </Grid>

          {/* <Grid item xs={12} md={3}> */}
            {/* <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography> */}
            {/* <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Contact Us
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
            Privacy Policy
            </Link> */}
          {/* </Grid> */}

          {/* <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
            Follow Us
            </Typography>
            <Link href="#" color="inherit" variant="body2" underline="hover">
            Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
            Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
            LinkedIn
            </Link>
            </Grid> */}

          <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end">
              <Button color="inherit" onClick={() => handleMenuItemClick("/about")}>
                {translate("navbar-about")}
              </Button>
            </Box>
            <Typography variant="body2" align="right">
              © 2024 Star! Month Tracker Maker
            </Typography>
            {/* <Typography variant="body2" align="right">
              All rights reserved.
            </Typography> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
