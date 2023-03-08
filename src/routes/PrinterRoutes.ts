import express from 'express'
import PrinterController from '../controllers/PrinterController';
import validateId, { validateUpdatePrinterBody, validateCreatePrinterBody } from '../validators/BaseValidators';

const router = express.Router();

router.get("/printers", PrinterController.getPrinters);

router.get("/printers/client/:id", validateId, PrinterController.getPrinters)

router.delete("/printer/:id", validateId, PrinterController.deletePrinterById);

router.patch("/printer/:id",validateId, validateUpdatePrinterBody ,PrinterController.updatePrinter);

router.post("/printer", validateCreatePrinterBody, PrinterController.createPrinter);

export default router;