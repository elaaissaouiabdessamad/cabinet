import React, { useState } from "react";

function Parametres() {
  const [language, setLanguage] = useState("fr");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [cookieConsent, setCookieConsent] = useState(false);

  // Fonctions de mise à jour des préférences
  const updateLanguage = (e) => setLanguage(e.target.value);
  const toggleEmailNotifications = () =>
    setEmailNotifications(!emailNotifications);
  const togglePushNotifications = () =>
    setPushNotifications(!pushNotifications);
  const updateTheme = (e) => setTheme(e.target.value);
  const toggleTwoFactorAuth = () => setTwoFactorAuth(!twoFactorAuth);
  const updateProfileVisibility = (e) => setProfileVisibility(e.target.value);
  const toggleCookieConsent = () => setCookieConsent(!cookieConsent);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Paramètres du compte</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Préférences de communication
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Langue préférée:</label>
          <select
            value={language}
            onChange={updateLanguage}
            className="w-full p-2 border rounded"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Notifications par e-mail:</label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={toggleEmailNotifications}
            className="mr-2"
          />
          Activer
        </div>
        <div className="mb-4">
          <label className="block mb-2">Notifications push:</label>
          <input
            type="checkbox"
            checked={pushNotifications}
            onChange={togglePushNotifications}
            className="mr-2"
          />
          Activer
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sécurité du compte</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Authentification à deux facteurs:
          </label>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={toggleTwoFactorAuth}
            className="mr-2"
          />
          Activer
        </div>
        <h3 className="text-xl font-semibold mb-2">Historique de connexion</h3>
        {connectedDevices.length > 0 ? (
          <ul>
            {connectedDevices.map((device, index) => (
              <li key={index} className="border-b py-2">
                {device}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun appareil connecté récemment.</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Personnalisation de l'interface
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Thème:</label>
          <select
            value={theme}
            onChange={updateTheme}
            className="w-full p-2 border rounded"
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Gestion des données personnelles
        </h2>
        <div className="mb-4">
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Accéder aux données personnelles
          </button>
        </div>
        <div className="mb-4">
          <button className="w-full bg-red-500 text-white p-2 rounded">
            Supprimer les données / Anonymiser
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Paramètres de confidentialité
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Visibilité du profil:</label>
          <select
            value={profileVisibility}
            onChange={updateProfileVisibility}
            className="w-full p-2 border rounded"
          >
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Fréquence des rappels de rendez-vous:
          </label>
          <input
            type="number"
            min="0"
            step="1"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Alertes de nouveaux messages:</label>
          <input type="checkbox" className="mr-2" />
          Activer
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Gestion des cookies et consentement RGPD
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Consentement pour les cookies:</label>
          <input
            type="checkbox"
            checked={cookieConsent}
            onChange={toggleCookieConsent}
            className="mr-2"
          />
          Activer
        </div>
      </div>
    </div>
  );
}

export default Parametres;
