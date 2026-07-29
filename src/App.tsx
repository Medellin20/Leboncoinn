import { useState } from 'react';
import { Building2, Smartphone } from 'lucide-react';
import BankTransfer from './components/BankTransfer';
import backgroundImage from './assets/imgLBC.jpg';

function App() {
  const [isBankTransferVisible, setIsBankTransferVisible] = useState(false);

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
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={() => setIsBankTransferVisible(true)}
              aria-pressed={isBankTransferVisible}
              className={`px-6 py-4 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-3 ${
                isBankTransferVisible
                  ? 'bg-orange-600 text-white ring-4 ring-orange-200'
                  : 'bg-white text-gray-800 hover:bg-orange-50'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Afficher le RIB
            </button>
          </div>

          {isBankTransferVisible && <BankTransfer />}
        </div>

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
