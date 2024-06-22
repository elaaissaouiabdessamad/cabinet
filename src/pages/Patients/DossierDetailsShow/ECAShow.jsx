import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon6 from "../../../assets/icon6.png";
import HeaderDossierClinicalExamShow from "../../../components/HeaderDossierClinicalExamShow";

const ECA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abdominalExamData, setAbdominalExamData] = useState([]);

  useEffect(() => {
    const fetchAbdominalExamData = async () => {
      try {
        setLoading(true);
        const response =
          await MedicalService.getAlClinicalExamslByMedicalDossierId(
            patient.id,
            "abdominal"
          );
        setAbdominalExamData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAbdominalExamData();
  }, [patient.id]);

  const handleDossierClinicalExamShow = () => {
    navigate(`/show/examen-clinique`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierClinicalExamShow
        handleDossierClinicalExamShow={handleDossierClinicalExamShow}
      />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon6} alt="Identité" className="mr-2 align-center w-8" />
            Examen clinique &nbsp;
            <span className="text-sm"> / Abdominal</span>
          </div>
        </div>
        {loading ? (
          <p className="p-6 justify-center">Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : abdominalExamData.length > 0 ? (
          <div className="p-6 m-4">
            {abdominalExamData.map((exam, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">Résultat de l'examen abdominal :</p>
                <textarea
                  readOnly
                  className="border border-gray-300 p-2 mt-4 rounded-lg w-full"
                  rows={4}
                  value={exam.abdominal}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-10 mt-10 text-gray-500 text-center">
            Aucun examen clinique abdominal disponible.
          </p>
        )}
      </div>
    </div>
  );
};

export default ECA;
