import { Router } from 'express';
import { CommuneController } from './controller.js';

const router = Router();

// Ruta para obtener todas las comunas
router.get('/', CommuneController.getAllCommunes);

// Ruta para obtener una comuna específica por ID
router.get('/:id', CommuneController.getCommuneById);

export class CommuneRoute {
  static route = router;
}