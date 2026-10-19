// Importation du routeur Express
import { Router, Request, Response } from 'express';
// Importation de l'utilitaire de réponse standardisée
import { sendResponse } from '../utils/apiResponse.js';

// Instanciation du routeur principal
const router: Router = Router();

// Route de diagnostic et de santé de l'API (Health Check)
router.get('/health', (_req: Request, res: Response) => {
  // Renvoi d'un statut HTTP 200 avec les métriques essentielles
  res.status(200).json(
    sendResponse(true, 'API CleanPro opérationnelle', {
      // Temps de fonctionnement du processus Node.js en secondes
      uptime: process.uptime(),
      // Environnement d'exécution (development, production, etc.)
      environment: process.env.NODE_ENV || 'development'
    })
  );
});

// Exportation par défaut du routeur
export default router;
