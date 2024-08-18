import React from 'react';
import { Card, Box, CardContent, Typography, CardMedia, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import avatarUrl from '../Assets/avatar.jpg';
import { useLanguage } from '../Contexts/LanguageContext';

const AboutView = () => {
  const { translate }= useLanguage();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Card sx={{ maxWidth: 400, textAlign: 'center', margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={avatarUrl} 
          sx={{ 
            objectFit: 'contain',
            width: '100%', 
            height: '200px', 
            marginTop: 3
          }}
          alt="Author Image"
        />
        <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          TundraDv
        </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {translate("about-body")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {translate("about-body2")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {translate("about-body3")}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
          <IconButton href="https://github.com/TundraDv" target="_blank" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://x.com/TundraDv" target="_blank" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
        </Stack>
      </Card>
    </Box>
  );
};


export default AboutView;