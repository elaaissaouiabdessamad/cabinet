import axios from "axios";

const API_URLB = "http://localhost:3000/api/biologies/";
const addBiology = (formData, patientId) => {
  return axios.post(API_URLB + "patient/" + patientId, formData);
};

const API_URLD = "http://localhost:3000/api/diagnosis/";
const addDiagnosis = (diagnosis, diagnosisDifferentiel, patientId) => {
  return axios.post(API_URLD + "patient/" + patientId, {
    diagnosis,
    diagnosisDifferentiel,
  });
};

const API_URLCE = "http://localhost:3000/api/clinical-exams/";
const addClinicalExam = (
  generalExam,
  functionalSigns,
  physicalSigns,
  pulmonary,
  abdominal,
  patientId
) => {
  return axios.post(API_URLCE + "patient/" + patientId, {
    generalExam,
    functionalSigns,
    physicalSigns,
    pulmonary,
    abdominal,
  });
};

const API_URLA = "http://localhost:3000/api/antecedents/";
const addAntecedent = (
  personal,
  familial,
  cardiovascularRiskFactors,
  patientId
) => {
  return axios.post(API_URLA + "patient/" + patientId, {
    personal,
    familial,
    cardiovascularRiskFactors,
  });
};

const API_URLEcg = "http://localhost:3000/api/ecgs/";
const addEcg = (formData, patientId) => {
  return axios.post(API_URLEcg + "patient/" + patientId, formData);
};

const API_URLExp = "http://localhost:3000/api/explorations/";
const addExploration = (formData, patientId) => {
  return axios.post(API_URLExp + "patient/" + patientId, formData);
};

const API_URLMD = "http://localhost:3000/api/medical-dossiers/";
const patchMedicalDossier = (
  hospitalization,
  historyDisease,
  primaryConclusion,
  conclusion,
  patientId
) => {
  return axios.patch(API_URLMD + "patient/" + patientId, {
    hospitalization,
    historyDisease,
    primaryConclusion,
    conclusion,
  });
};

const API_URLMDGet = "http://localhost:3000/api/medical-dossiers/";

const getMedicalDossierByPatientId = (patientId) => {
  return axios.get(API_URLMDGet + "patient/" + patientId);
};

const MedicalService = {
  addBiology,
  addDiagnosis,
  addClinicalExam,
  addAntecedent,
  addEcg,
  addExploration,
  patchMedicalDossier,
  getMedicalDossierByPatientId,
};

export default MedicalService;
