import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import Sitemark from '../SitemarkIcon/SitemarkIcon';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.
        vars || theme).shadows[1],
    padding: '8px 12px',
    minHeight: '64px', // AppBar 높이 고정
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleSignIn = () => {
        setIsLoggedIn(true);
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Button color="primary" onClick={() => navigate('/')}>
                            Olive Young
                        </Button>
                        <Sitemark />
                    </Box>

                    <ButtonGroup sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {isLoggedIn ? (
                            <>
                                <Button color="primary" onClick={() => navigate('/cart')}>
                                    Cart
                                </Button>
                                <Button color="primary" variant="outlined" size="small" onClick={handleSignOut}>
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="primary" variant="text" size="small" onClick={handleSignIn}>
                                    Sign in
                                </Button>
                                <Button color="primary" variant="contained" size="small" onClick={() => navigate('/signup')}>
                                    Sign up
                                </Button>
                            </>
                        )}
                    </ButtonGroup>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                <MenuItem onClick={() => navigate('/cart')}>Cart</MenuItem>
                                <Divider sx={{ my: 3 }} />

                                {isLoggedIn ? (
                                    <>
                                        <MenuItem>
                                            <Button color="primary" fullWidth onClick={() => navigate('/cart')}>
                                                Cart
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button color="primary" variant="outlined" fullWidth onClick={handleSignOut}>
                                                Sign out
                                            </Button>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Button color="primary" variant="contained" fullWidth onClick={() => navigate('/signup')}>
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button color="primary" variant="outlined" fullWidth onClick={handleSignIn}>
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
