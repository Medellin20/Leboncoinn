import { useState } from 'react';
import { Building2, Copy, Check } from 'lucide-react';

export default function BankTransfer() {
  const [copied, setCopied] = useState(false);

  const ribInfo = {
    titulaire: 'Marthe Dufour',
    banque: 'Banque Populaire',
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    bic: 'CCBPFRPPXXX'
  };

  const copyRIB = () => {
    const ribText = `
Titulaire: ${ribInfo.titulaire}
Banque: ${ribInfo.banque}
IBAN: ${ribInfo.iban}
BIC: ${ribInfo.bic}
    `.trim();

    navigator.clipboard.writeText(ribText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-lg">
          <Building2 className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Payer par virement bancaire</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Effectuez votre virement en utilisant les coordonnées bancaires ci-dessous :
      </p>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4 mb-6">
        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm font-semibold text-gray-500 mb-1">Titulaire du compte</p>
          <p className="text-lg font-bold text-gray-800">{ribInfo.titulaire}</p>
        </div>

        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm font-semibold text-gray-500 mb-1">Banque</p>
          <p className="text-lg font-bold text-gray-800">{ribInfo.banque}</p>
        </div>

        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm font-semibold text-gray-500 mb-1">IBAN</p>
          <p className="text-lg font-mono font-bold text-gray-800">{ribInfo.iban}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500 mb-1">BIC</p>
          <p className="text-lg font-mono font-bold text-gray-800">{ribInfo.bic}</p>
        </div>
      </div>

      <button
        onClick={copyRIB}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            RIB copié !
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copier le RIB
          </>
        )}
      </button>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note :</strong> Après votre virement, veuillez envoyer le Bordereau de virement au vendeur par mail{' '}
          <a href="mailto:marthedufour23@gmail.com" className="underline font-semibold">
            marthedufour23@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
