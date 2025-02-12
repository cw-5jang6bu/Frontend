import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PaymentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 375,
    padding: theme.spacing(3),
    borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
    border: '1px solid ',
    borderColor: (theme.vars || theme).palette.divider,
    background:
        'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
    boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
}));

const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function PaymentForm() {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [name, setName] = React.useState('');

    const handleCardNumberChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.post('http://localhost:8082/payments', );
        // }
        if (address && cardNumber && name) {
            const paymentData = {
                address,
                cardNumber,
                name,
            };
            console.log('Payment Submitted:', paymentData);

            // Placeholder for API integration
            alert('Payment Successful!');
            navigate("/");
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Stack spacing={3} useFlexGap>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormGrid>
                    <FormLabel htmlFor="address" required>
                        Address
                    </FormLabel>
                    <OutlinedInput
                        id="address"
                        name="address"
                        placeholder="Street name and number"
                        autoComplete="shipping address-line1"
                        required
                        size="small"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FormGrid>

                <PaymentContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">Credit Card</Typography>
                        <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
                    </Box>

                    <SimCardRoundedIcon
                        sx={{
                            fontSize: { xs: 48, sm: 56 },
                            transform: 'rotate(90deg)',
                            color: 'text.secondary',
                        }}
                    />

                    <FormGrid sx={{ flexGrow: 1 }}>
                        <FormLabel htmlFor="card-number" required>
                            Card Number
                        </FormLabel>
                        <OutlinedInput
                            id="card-number"
                            autoComplete="card-number"
                            placeholder="0000 0000 0000 0000"
                            required
                            size="small"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                    </FormGrid>

                    <FormGrid sx={{ flexGrow: 1, mt: 2 }}>
                        <FormLabel htmlFor="card-name" required>
                            Name
                        </FormLabel>
                        <OutlinedInput
                            id="card-name"
                            autoComplete="card-name"
                            placeholder="John Smith"
                            required
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGrid>
                </PaymentContainer>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 2, mt: 2 }}
                    onClick={handlePayment}
                >
                    Pay Now
                </Button>
            </Box>
        </Stack>
    );
}
