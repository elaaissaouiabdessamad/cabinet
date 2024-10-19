import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-16 py-32 text-center">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-4xl mb-4">Page non trouvée</p>
      <p className="mb-4">Désolé, la page que vous recherchez n'existe pas.</p>
      <Link
        to="/dashboard"
        className="bg-[#8f8df2] text-white py-2 px-4 rounded hover:bg-[#9f9df2] transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
