import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon6 from "../../../assets/icon6.png";
import HeaderDossierClinicalExamShow from "../../../components/HeaderDossierClinicalExamShow";

const ECVVShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardiovascularExamData, setCardiovascularExamData] = useState([]);

  useEffect(() => {
    const fetchCardiovascularExamData = async () => {
      try {
        setLoading(true);
        const response =
          await MedicalService.getAlClinicalExamslByMedicalDossierId(
            patient.id,
            "other"
          );
        setCardiovascularExamData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCardiovascularExamData();
  }, [patient.id]);

  const handleDossierClinicalExamShow = () => {
    navigate(`/show/examen-clinique`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-7">
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
            <span className="text-sm"> / Cardio vasculaire</span>
          </div>
        </div>
        {loading ? (
          <p className="p-6 justify-center">Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cardiovascularExamData.length > 0 ? (
          <div className="p-6">
            {cardiovascularExamData.map((exam, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-lg"
              >
                <div className="mb-2">
                  <p className="font-bold">Examen Général :</p>
                  <p>{exam.generalExam}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Signes Fonctionnels :</p>
                  <p>{exam.functionalSigns}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Signes Physiques :</p>
                  <p>{exam.physicalSigns}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-10 mt-10 text-gray-500 text-center">
            Aucun examen clinique cardio vasculaire disponible.
          </p>
        )}
      </div>
    </div>
  );
};

export default ECVVShow;
