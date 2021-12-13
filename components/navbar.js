import { ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { Box, Tabs, Tab, Badge, styled, IconButton, AppBar, Container, Toolbar, Typography, MenuItem, Button, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const StyledBadge2 = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


export default function NavTabs() {
    const [count, setCount] = useState(0)
    const [menuNav, setMenuNav] = useState(null)

    const handleOpenNavMenu = (event) => {
        setMenuNav(event.currentTarget);
    };
    const handleCloseNavMenu = (event) => {
        setMenuNav(null);
    };

    useEffect(() => {
        let cart = localStorage.getItem('cart');
        if (cart !== undefined) {
            if (cart === null) {
                setCount(0)
            } else {
                let result = JSON.parse(cart) || [];
                setCount(result.length)
            }
        }

    }, [])
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div"
                        sx={{mr:2, display: {xs:'none', md: 'flex'}}}>
                        Mini Commerce
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs:'flex', md:'none'}}}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={menuNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(menuNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                            <Link className="nav-link" aria-current="page" as="/" href='/'>Home</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                            <Link className="nav-link" as="/categories" href='/categories'>Category</Link>
                            </Typography>
                        </MenuItem>

                        </Menu>
                    </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Mini Commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              <Link className="nav-link" aria-current="page" as="/" href='/'>Home</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              <Link className="nav-link" as="/categories" href='/categories'>Category</Link>  
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Link className="nav-link" as="/cart" href='/cart'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', paddingRight: 1 }}
              > My Cart
                    <StyledBadge2 badgeContent={count} color="secondary">
                    </StyledBadge2>
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }}}>
            <Tooltip title="My Cart">
            <Link className="nav-link" as="/cart" href='/cart'>
                <IconButton aria-label="cart" sx={{ paddingRight: 3 }}>
                    <StyledBadge badgeContent={count} color="secondary">
                        <ShoppingCart style={{color: 'white'}} />
                    </StyledBadge>
                </IconButton>
            </Link>
            </Tooltip>
          </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}