

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoice(invoiceData) {
    const doc = new PDFDocument();
    const invoiceFilePath = path.join(__dirname, 'invoices', `invoice_${invoiceData.id}.pdf`);

    doc.pipe(fs.createWriteStream(invoiceFilePath));
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.text(`Invoice ID: ${invoiceData.id}`);
    doc.text(`User ID: ${invoiceData.userId || 'N/A'}`);
    doc.text(`Amount: ₹${invoiceData.amount.toLocaleString('en-IN')}}`);
    doc.text(`Bill Type: ${invoiceData.type}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.end();

    console.log(`Invoice generated: ${invoiceFilePath}`);
    return invoiceFilePath;
}

module.exports = { generateInvoice };


