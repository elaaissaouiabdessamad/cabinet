import React from "react";

const AssignmentCardNotFound = ({ title, type }) => {
  return (
    <div className="mb-2 p-8 border rounded-lg shadow-sm flex flex-col space-y-2">
      <h4 className="text-lg font-semibold">
        {title} en{" "}
        {type == "salle de cathétérisme"
          ? "Salle de Cathétérisme"
          : "Bloc de Rythmologie"}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <p className="flex items-center">Pas d'affectation proche trouvé !</p>
      </div>
    </div>
  );
};

export default AssignmentCardNotFound;
