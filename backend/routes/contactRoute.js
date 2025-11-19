import express from 'express';

import { createContactController, getAllContactsController } from '../controllers/contactController.js';

const router = express.Router();

router.post('/createContact', createContactController);
router.get('/getAllContacts', getAllContactsController);

export default router;