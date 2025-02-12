import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../Components/SharedTheme/AppTheme';
import { SitemarkIcon } from '../Components/CustomIcons/CustomIcons';

// 스타일 설정
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function SignUp(props) {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    // 폼 제출 처리
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event) {
            const data = new FormData(event.currentTarget);
            const payload = {
                email: data.get('email'),
                password: data.get('password'),
            };

            try {
                const response = await axios.post('http://localhost:8081/members/register', payload);
                console.log("Signup successful:", response.data);
                // 회원가입 성공 후 로그인 페이지로 이동
                navigate('/signin');
            } catch (error) {
                console.error("Error signing up:", error);
                // 필요시 에러 메시지를 사용자에게 표시할 수 있습니다.
            }
        }
    };

    // const handleSubmit =  (e) => {
    //     e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    //     const userData = {email: email, password: password};
    //     console.log(userData.email);
    //     console.log("hi");
    // };

    return (
        <AppTheme {...props}>
            <CssBaseline />
            <SignUpContainer>
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained">
                            Sign Up
                        </Button>
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}



