// Importation du framework Express
import express, { Application, Request, Response } from 'express';
// Importation du middleware CORS pour la gestion des origines autorisées
import cors from 'cors';
// Importation des routes principales de l'API
import routes from './routes/index.js';

// Création de l'instance de l'application Express
const app: Application = express();

// Configuration du middleware CORS (Sécurité OWASP / Restriction des origines)
app.use(cors({
  // Autorisation de l'origine définie dans les variables d'environnement ou toutes en dev
  origin: process.env.CLIENT_URL || '*',
  // Autorisation des méthodes HTTP autorisées
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // Autorisation des cookies et headers d'authentification
  credentials: true
}));

// Middleware pour parser les corps de requêtes au format JSON avec limitation de taille (Anti-DoS / CWE-400)
app.use(express.json({ limit: '10kb' }));

// Middleware pour parser les données encodées en URL
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Montage du préfixe global de l'API versionnée (/api/v1)
app.use('/api/v1', routes);

// Route d'accueil racine pour vérifier la disponibilité générale
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'CleanPro Backend API',
    status: 'Running',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

// Exportation de l'application Express configurée
export default app;
