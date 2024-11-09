


const { generateInvoice } = require('../invoiceGenerator');

function processPayment(paymentData) {
    console.log(`Processing payment for user: ${paymentData.userId}`);
    generateInvoice(paymentData);
    console.log('Payment processed and invoice generated.');
}

function addPaymentRequest(paymentData) {
    processPayment(paymentData);
}

module.exports = { addPaymentRequest };
