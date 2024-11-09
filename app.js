

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { generateInvoice } = require('./invoiceGenerator'); // Import from separate file
const app = express();
app.use(bodyParser.json());

const invoicesDir = path.join(__dirname, 'invoices');
if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
}

class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) { this.items.push(item); }
    dequeue() { return this.items.shift(); }
    isEmpty() { return this.items.length === 0; }
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    isEmpty() { return this.items.length === 0; }
}

const paymentQueue = new Queue();
const priorityQueue = new Queue();
const transactionHistory = new Stack();

app.post('/payments', (req, res) => {
    const paymentData = req.body;
    if (!paymentData.id || !paymentData.amount || !paymentData.type) {
        return res.status(400).json({ message: 'Invalid payment data' });
    }
    paymentQueue.enqueue(paymentData);
    processPayment(paymentData);
    res.status(201).json({ message: 'Payment processed successfully', data: paymentData });
});

app.post('/urgent-requests', (req, res) => {
    const urgentData = req.body;
    if (!urgentData.id || !urgentData.amount || !urgentData.type) {
        return res.status(400).json({ message: 'Invalid urgent request data' });
    }
    priorityQueue.enqueue(urgentData);
    processUrgentRequest(urgentData);
    res.status(201).json({ message: 'Urgent request processed successfully', data: urgentData });
});

async function processPayment(paymentData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    logTransaction(paymentData);
    generateInvoice(paymentData);
    transactionHistory.push(paymentData);
}

async function processUrgentRequest(urgentData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    logTransaction(urgentData);
    generateInvoice(urgentData);
    transactionHistory.push(urgentData);
}

function logTransaction(data) {
     const logEntry = `${new Date().toISOString()},${data.id},${data.amount},${data.type}\n`;
    fs.appendFileSync('transactions.csv', logEntry);
}

app.get('/invoices/:id', (req, res) => {
    const invoiceId = req.params.id;
    const invoicePath = path.join(invoicesDir, `invoice_${invoiceId}.pdf`);
    if (fs.existsSync(invoicePath)) {
        res.sendFile(invoicePath);
    } else {
        res.status(404).json({ message: 'Invoice not found' });
    }
});

app.get('/transactions', (req, res) => {
    res.json(transactionHistory.items);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


