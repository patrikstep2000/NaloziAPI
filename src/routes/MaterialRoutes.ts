import express from 'express'
import MaterialController from '../controllers/MaterialController';

const router = express.Router();

router.get("/materials" , MaterialController.getAllMaterials);

export default router;