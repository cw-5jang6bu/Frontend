import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../Components/SharedTheme/AppTheme';
import AppAppBar from '../Components/AppBar/AppBar';
import MainContent from '../Components/Home/MainContent';
import Latest from '../Components/Home/Latest';
import Footer from '../Components/Footer/Footer';

export default function Home(props) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                <MainContent />
            </Container>
            <Footer />
        </AppTheme>
    );
}