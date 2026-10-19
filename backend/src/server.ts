// Chargement des variables d'environnement depuis le fichier .env
import 'dotenv/config';
// Importation de l'application Express
import app from './app.js';

// Récupération du port d'écoute (par défaut 5000)
const PORT = process.env.PORT || 5000;

// Démarrage du serveur HTTP et écoute sur le port configuré
const server = app.listen(PORT, () => {
  // Affichage du log de succès avec les informations d'exécution
  console.log(`🚀 Serveur CleanPro actif sur http://localhost:${PORT}`);
  console.log(`🏥 Route de santé : http://localhost:${PORT}/api/v1/health`);
});

// Interception des erreurs de promesses non gérées pour éviter un arrêt brutal imprévu (CWE-755)
process.on('unhandledRejection', (reason: Error) => {
  console.error('❌ Erreur critique non gérée :', reason.message);
  // Fermeture propre du serveur avant arrêt du processus
  server.close(() => process.exit(1));
});
