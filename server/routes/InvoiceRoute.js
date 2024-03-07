const express = require('express');
const router = express.Router();
const InvControl = require('../controllers/InvoiceController')

router.get('/invoice/:invoiceId', InvControl.getInvoice);
router.get('/', InvControl.getAllInvoices);
router.get('/:userId', InvControl.getInvoicesByUserId);
router.post('/addNew', InvControl.addNewInvoice);

//data analyst
// router.post('/invoices-by-month', InvControl.getInvoicesByMonth);

module.exports = router;

