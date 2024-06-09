import axios from "axios";

const API_URLB = "http://localhost:3000/api/biologies/";
const addBiology = (formData, patientId) => {
  return axios.post(API_URLB + "patient/" + patientId, formData);
};

const getAllBiologiesByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLB + "medical-dossier/" + medicalDossierId);
};

const API_URLD = "http://localhost:3000/api/diagnosis/";
const addDiagnosis = (diagnosis, diagnosisDifferentiel, patientId) => {
  return axios.post(API_URLD + "patient/" + patientId, {
    diagnosis,
    diagnosisDifferentiel,
  });
};

const getAllDiagnosisByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLD + "medical-dossier/" + medicalDossierId);
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

const getAlClinicalExamslByMedicalDossierId = (medicalDossierId, section) => {
  return axios.get(
    API_URLCE + "section/" + section + "/medical-dossier/" + medicalDossierId
  );
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

const getAllAntecedentsByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLA + "medical-dossier/" + medicalDossierId);
};

const API_URLEcg = "http://localhost:3000/api/ecgs/";
const addEcg = (formData, patientId) => {
  return axios.post(API_URLEcg + "patient/" + patientId, formData);
};
const getAllEcgsByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLEcg + "medical-dossier/" + medicalDossierId);
};

const API_URLExp = "http://localhost:3000/api/explorations/";
const addExploration = (formData, patientId) => {
  return axios.post(API_URLExp + "patient/" + patientId, formData);
};

const getAllExpRTByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLExp + "rt/" + medicalDossierId);
};

const getAllExpEchoByMedicalDossierId = (medicalDossierId) => {
  return axios.get(API_URLExp + "echo/" + medicalDossierId);
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
  getAllExpRTByMedicalDossierId,
  getAllExpEchoByMedicalDossierId,
  getAllEcgsByMedicalDossierId,
  getAllAntecedentsByMedicalDossierId,
  getAlClinicalExamslByMedicalDossierId,
  getAllDiagnosisByMedicalDossierId,
  getAllBiologiesByMedicalDossierId,
};

export default MedicalService;
