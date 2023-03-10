import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { VscPreview } from 'react-icons/vsc';
import { FiSettings } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Comp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, setUser] = useState();

   const notify = () =>
     toast.success(' Copied!', {
       position: 'top-center',
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: 'light',
     });

  useEffect(() => {
    getDoc(doc(db, 'admin', auth?.currentUser?.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return user ? (
    <AppBar
      position="static"
      style={{
        borderRadius: '40px',

        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <Container maxWidth="lg" className="">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user.fullName}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.fullName} src="/static/images/avatar/1.jpg" />
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
              <MenuItem
                className="mt-4 pt-2 pb-2"
                onClick={handleCloseUserMenu}
                // style={{ width: '350px', height: '100%' }}
              >
                <Typography textAlign="center">
                  <div className="funkiller d-flex align-items-center">
                    <Avatar
                      alt={user.fullName}
                      src="/static/images/avatar/1.jpg"
                    />
                    <span className="mx-3">{user.email}</span>
                  </div>
                </Typography>
              </MenuItem>{' '}
              <Link
                to={`share/${user.fullName}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  className="mt-4 pt-2 pb-2"
                >
                  <Typography textAlign="center">
                    <div className="funkiller d-flex align-items-center">
                      {' '}
                      <VscPreview style={{ fontSize: '35px' }} />{' '}
                      <span className="mx-3">Preview Link</span>{' '}
                    </div>
                  </Typography>
                </MenuItem>
              </Link>
              <MenuItem
                onClick={handleCloseUserMenu}
                className="mt-4 pt-2 pb-2 "
              >
                <Typography textAlign="center">
                  <div className="funkiller d-flex align-items-center">
                    <FiSettings style={{ fontSize: '35px' }} />
                    <span className="mx-3">Settings </span>
                    <span style={{ opacity: '0.4' }}>(coming soon)</span>{' '}
                  </div>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  notify();
                  handleCloseUserMenu();
                }}
                className="mt-4 pt-2 pb-2 "
style={{display:'flex',flexWrap:'wrap'}}
              >
                <Typography textAlign="center">
                  <div className="container oje">
                    <div className="d-flex align-items-center">
                      <div>
                        <span className="" style={{opacity:'0.4'}}>
                          {`https://sendlinks.vercel.app/share/${user.fullName}`}{' '}
                        </span>{' '}
                      </div>
                      <div>
                        {' '}
                        <CopyToClipboard
                          text={`https://sendlinks.vercel.app/share/${user.fullName}`}
                        >
                          <span className=" ewow mx-2">
                            copy Link
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </Typography>
              </MenuItem>
            </Menu>
            <ToastContainer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : null;
}
export default ResponsiveAppBar;
