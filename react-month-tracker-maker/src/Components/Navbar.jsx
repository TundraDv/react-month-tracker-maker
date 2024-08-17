import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sta from '../Assets/watashiwasta-bgremoved.png';
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../Contexts/LanguageContext';


const Navbar = () => {
  const { updateLocale, translate } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    updateLocale(language);
    handleLanguageClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height: 60, boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/month")}>
          <img src={Sta} alt="Logo" style={{ height: "auto", maxHeight: "45px" }} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Star!
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ sx: { width: '200px' } }}
            >
              <MenuItem onClick={() => handleMenuItemClick("/")}>Maker</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("/templates")}>{translate("navbar-templates")}</MenuItem>
              <MenuItem onClick={handleLanguageClick}>{translate("navbar-language")}</MenuItem>
              {/* <MenuItem onClick={() => handleMenuItemClick("/about")}>{translate("navbar-about")}</MenuItem> */}
            </Menu>
            <Menu
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={handleLanguageClose}
              PaperProps={{ sx: { width: '200px' } }}
            >
              <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => handleMenuItemClick("/")}>Maker</Button>
            <Button color="inherit" onClick={() => handleMenuItemClick("/templates")}>{translate("navbar-templates")}</Button>
            <Button color="inherit" onClick={handleLanguageClick}>{translate("navbar-language")}</Button>
            <Menu
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={handleLanguageClose}
              sx={{ width: '200px' }}
            >
              <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
            </Menu>
            {/* <Button color="inherit" onClick={() => handleMenuItemClick("/about")}>{translate("navbar-about")}</Button> */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
