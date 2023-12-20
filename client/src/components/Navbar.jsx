import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px", // Increase the font size
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    fontSize: "14px", // Increase the font size
  },
}));

export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [burgerMenuAnchorEl, setBurgerMenuAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isBurgerMenuOpen = Boolean(burgerMenuAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleBurgerMenuOpen = (event) => {
    setBurgerMenuAnchorEl(event.currentTarget);
  };

  const handleBurgerMenuClose = () => {
    setBurgerMenuAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const navigate = useNavigate();

  const burgerMenuId = "burger-menu";
  const renderBurgerMenu = (
    <Menu
      anchorEl={burgerMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={burgerMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isBurgerMenuOpen}
      onClose={handleBurgerMenuClose}
    >
      <MenuItem
        onClick={() => navigate("/dashboard")}
        style={{ fontSize: "18px", padding: "12px" }} // Increase the font size and padding
      >
        Dashboard
      </MenuItem>
      <MenuItem
        onClick={() => navigate("/liked")}
        style={{ fontSize: "18px", padding: "12px" }} // Increase the font size and padding
      >
        Liked
      </MenuItem>
      <MenuItem
        onClick={() => navigate("/comments")}
        style={{ fontSize: "18px", padding: "12px" }} // Increase the font size and padding
      >
        Comments
      </MenuItem>

      <MenuItem
        onClick={() => navigate("/userprofile")}
        style={{ fontSize: "18px", padding: "12px" }} // Increase the font size and padding
      >
        Profile
      </MenuItem>

      <MenuItem
        onClick={() => navigate("/")}
        style={{ fontSize: "18px", padding: "12px" }} // Increase the font size and padding
      >
        Log out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#E50914" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, fontSize: "32px" }} // Increase the font size
            onClick={handleBurgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontSize: 24 }}>
            CineSearch
          </Typography>

          {/* Remove the Box component and render MoreIcon directly */}
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" } }} // Show only for md screen size
          ></IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderBurgerMenu}
    </Box>
  );
}
