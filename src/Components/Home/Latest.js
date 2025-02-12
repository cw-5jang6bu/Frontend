import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


const articleInfo = [
    {
        tag: 'Engineering',
        title: 'The future of AI in software engineering',
        description:
            'Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.',
        authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        tag: 'Product',
        title: 'Driving growth with user-centric product design',
        description:
            'Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.',
        authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
];

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:hover': { cursor: 'pointer' },
    '& .arrow': {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&:hover .arrow': {
        visibility: 'visible',
        opacity: 0.7,
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
        borderRadius: '8px',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '1px',
        bottom: 0,
        left: 0,
        backgroundColor: (theme.vars || theme).palette.text.primary,
        opacity: 0.3,
        transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
        width: '100%',
    },
}));

export default function Latest() {
    const navigate = useNavigate();
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
    const [cartItems, setCartItems] = React.useState([]);

    React.useEffect(() => {
        //const memberId = localStorage.getItem('LoggedInID');
        //console.log(memberId);// ✅ localStorage에서 id 가져오기
        if (true) {
            fetch(`http://localhost:8082/cart/1/products`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch cart items');
                    }
                    return response.json();
                })
                .then(data => setCartItems(data))  // ✅ API 응답 데이터를 상태로 설정
                .catch(error => console.error('Error fetching cart items:', error));
        }
    }, []);


    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Cart
            </Typography>
            <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Grid item xs={12} key={index} sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                    height: '150px',
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    boxSizing: 'border-box',
                                    width: '100%'
                                }}
                            >
                                <Typography gutterBottom variant="caption" component="div">
                                    {item.category || 'Item'}
                                </Typography>
                                <TitleTypography
                                    gutterBottom
                                    variant="h6"
                                    onFocus={() => handleFocus(index)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === index ? 'Mui-focused' : ''}
                                >
                                    {item.name}
                                    <NavigateNextRoundedIcon
                                        className="arrow"
                                        sx={{ fontSize: '1rem' }}
                                    />
                                </TitleTypography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    Quantity: {item.stock} | Price: ${item.price}
                                </StyledTypography>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        No items in your cart.
                    </Typography>
                )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                    onClick={() => navigate('/checkout')}
                >
                    Order
                </Button>
            </Box>
        </div>
    );
}