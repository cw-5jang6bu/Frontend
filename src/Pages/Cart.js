import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../Components/SharedTheme/AppTheme';
import AppAppBar from '../Components/AppBar/AppBar';
import Latest from '../Components/Home/Latest';
import Footer from '../Components/Footer/Footer';


export default function Cart (props) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Container
                maxWidth="lg"
                children="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >
                <Latest />
            </Container>
            <Footer/>
        </AppTheme>
    )
}