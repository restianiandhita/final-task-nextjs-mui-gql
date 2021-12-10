import { ShoppingCart } from '@mui/icons-material';
import { Box, Tabs, Tab, Badge, styled, IconButton } from '@mui/material';
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

export default function NavTabs() {
    const [count, setCount] = useState(0)
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
        <Box sx={{ width: '100%', bgcolor: '#C4D9F4' }}>
            <Tabs centered>
                <Link className="nav-link" aria-current="page" as="/" href='/'><Tab label="Home" /></Link>
                <Link className="nav-link" as="/categories" href='/categories'><Tab label="Category" /></Link>
                {
                    (count == 0) ?
                        <Link className="nav-link" as="/cart" href='/cart'><Tab label="Cart" /></Link>
                        :<Link className="nav-link" as="/cart" href='/cart'>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={count} color="secondary">
                            <ShoppingCart />
                            </StyledBadge>
                         </IconButton>
                         </Link> 
                            /* 
                            <Badge badgeContent={count} color="primary">
                            <Tab label="Cart"></Tab>
                            </Badge>
                            */
                        
                }
            </Tabs>
        </Box>

    )
}