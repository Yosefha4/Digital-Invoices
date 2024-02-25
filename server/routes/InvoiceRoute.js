const express = require('express');
const router = express.Router();
const InvControl = require('../controllers/InvoiceController')

router.get('/invoice/:invoiceId', InvControl.getInvoice);
router.get('/', InvControl.getAllInvoices);
router.get('/:userId', InvControl.getInvoicesByUserId);
router.post('/addNew', InvControl.addNewInvoice);

module.exports = router;

