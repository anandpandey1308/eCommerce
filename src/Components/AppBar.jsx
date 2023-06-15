import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Menu } from '@mui/material';

const pages = ['Category'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
  boxShadow: theme.shadows[2],
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '0.3rem',
  color: 'white',
  textDecoration: 'none',
}));

const StyledLogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '0.3rem',
  color: 'inherit',
  textDecoration: 'none',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  backgroundColor: '#ffffff',
}));

function DropdownMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        ref={anchorRef}
        onClick={handleOpenMenu}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Category
      </Button>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            mt: '2px',
            zIndex: 1,
            boxShadow: (theme) => theme.shadows[4],
            background: 'white',
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page}
              onClick={handleCloseMenu}
              sx={{ justifyContent: 'center' }}
            >
              <Typography>{page}</Typography>
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
}

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <StyledTypography variant="h6" noWrap>
            E-COMMERCE
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <StyledAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>

          <StyledLogoTypography variant="h5" noWrap>
            LOGO
          </StyledLogoTypography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <DropdownMenu />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default ResponsiveAppBar;
