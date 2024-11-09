# utility_bill_system

# Payment and Invoice Generation API

This project is a simple API that allows you to process payments, handle urgent payment requests, and generate invoices in PDF format. The invoice includes details like the invoice ID, user ID, amount in Indian Rupees (₹), bill type, and the date of generation.

## Features

- **Payment Processing**: Process normal and urgent payment requests.
- **Invoice Generation**: Generate PDF invoices with details like invoice ID, user ID, amount, and bill type.
- **Transaction Logging**: Logs each transaction in a CSV file for record-keeping.
- **Payment Queue**: Handles regular and urgent payment requests using a queue system.
- **Get Invoices**: Retrieve generated invoices by invoice ID.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **PDFKit**: Library for generating PDF invoices.
- **Body-Parser**: Middleware to parse incoming request bodies.
- **File System (fs)**: For saving and reading files (CSV for transactions and PDFs for invoices).
- **Path**: To handle file and directory paths.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/payment-invoice-api.git
