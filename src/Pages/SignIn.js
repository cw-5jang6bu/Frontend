import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../Components/SharedTheme/AppTheme';
import {  SitemarkIcon } from '../Components/CustomIcons/CustomIcons';
import axios from "axios";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default function SignIn(props) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8081/members/login',
                { email, password }
            );
            if (response.data) {
                console.log("로그인 성공: ", response.data);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('LoggedInID: ', response.data);
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.log("signin error:", error);
            setError('Invalid email or password');
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="center">
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@example.com"
                                required
                                fullWidth
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password123"
                                required
                                fullWidth
                            />
                        </FormControl>
                        {error && (
                            <Typography color="error" sx={{ textAlign: 'center' }}>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained">
                            Sign in
                        </Button>
                    </Box>
                    <Typography sx={{ textAlign: 'center', marginTop: 2, color: 'green' }}>
                        Use: kstilliard0@addtoany.com / kD1/h"EMgZzreu
                    </Typography>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}