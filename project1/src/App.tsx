import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import CardPaymentForm from './components/CardPaymentForm';
import BankTransfer from './components/BankTransfer';
import backgroundImage from './assets/imgLBC.jpg';

function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Calque 1 : dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-gray-100 z-0" />
      {/* Calque 2 : image de fond (visible au-dessus du dégradé) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.15,
        }}
      />
      {/* Calque 3 : contenu */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-orange-600 p-4 rounded-full">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Paiement sécurisé LBC
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez votre méthode de paiement préférée pour finaliser votre transaction en toute sécurité
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <BankTransfer />

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setIsCardModalOpen(true)}
              className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
            >
              Payer par carte
            </button>
          </div>
        </div>

        {isCardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-lg mx-4">
              <button
                type="button"
                onClick={() => setIsCardModalOpen(false)}
                className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <CardPaymentForm />
            </div>
          </div>
        )}

        <footer className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Connexion sécurisée SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Données cryptées</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Protection garantie</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
