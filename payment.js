


const express = require('express');
const router = express.Router();
const { addPaymentRequest } = require('../controllers/paymentController');

router.post('/process', (req, res) => {
    const paymentData = req.body;

    
    if (!paymentData.id || !paymentData.amount || !paymentData.type) {
        return res.status(400).json({ message: 'Invalid payment data. Fields "id", "amount", and "type" are required.' });
    }

    try {
        addPaymentRequest(paymentData);
        res.status(200).json({ message: 'Payment processed, and invoice generated successfully.', data: paymentData });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment.' });
    }
});

module.exports = router;
