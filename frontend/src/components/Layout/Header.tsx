import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import logo from '../../logo/logo.png'


function Header() {

    return (
        <AppBar position="static" sx={{height: '80px'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{height: '100%'}}>
                    <Avatar src={logo} sx={{display: {xs: 'none', md: 'flex'}, mr: 2, width: '80px', height: '80px'}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            mr: 4,
                            lineHeight: '80px'
                        }}
                    >
                        BikePackr
                    </Typography>
                    <Avatar src={logo} sx={{display: {xs: 'flex', md: 'none'}, mr: 2, width: '60px', height: '60px'}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            ml: 2,
                            lineHeight: '80px'
                        }}
                    >
                        BikePackr
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;