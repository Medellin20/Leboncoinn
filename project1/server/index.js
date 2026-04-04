/**
 * Serveur minimal pour exposer le service d'envoi d'emails.
 * POST /api/send-payment avec le body JSON du formulaire paiement par carte.
 * Charge le .env à la racine du projet (EMAIL_USER, EMAIL_PASS).
 */
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendPaymentEmail } from './emailService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/send-payment') {
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: 'Not found' }));
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  let data = {};
  try {
    data = JSON.parse(body || '{}');
  } catch {
    res.writeHead(400);
    res.end(JSON.stringify({ success: false, error: 'Body JSON invalide' }));
    return;
  }

  const result = await sendPaymentEmail(data);
  res.writeHead(result.success ? 200 : 500);
  res.end(JSON.stringify(result));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
