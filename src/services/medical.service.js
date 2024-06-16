import axiosInstance from "./axiosInstance";

const API_URLB = "biologies/";
const addBiology = (formData, patientId) => {
  return axiosInstance.post(API_URLB + "patient/" + patientId, formData);
};

const getAllBiologiesByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLB + "medical-dossier/" + medicalDossierId);
};

const API_URLD = "diagnosis/";
const addDiagnosis = (diagnosis, diagnosisDifferentiel, patientId) => {
  return axiosInstance.post(API_URLD + "patient/" + patientId, {
    diagnosis,
    diagnosisDifferentiel,
  });
};

const getAllDiagnosisByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLD + "medical-dossier/" + medicalDossierId);
};

const API_URLCE = "clinical-exams/";
const addClinicalExam = (
  generalExam,
  functionalSigns,
  physicalSigns,
  pulmonary,
  abdominal,
  patientId
) => {
  return axiosInstance.post(API_URLCE + "patient/" + patientId, {
    generalExam,
    functionalSigns,
    physicalSigns,
    pulmonary,
    abdominal,
  });
};

const getAlClinicalExamslByMedicalDossierId = (medicalDossierId, section) => {
  return axiosInstance.get(
    API_URLCE + "section/" + section + "/medical-dossier/" + medicalDossierId
  );
};

const API_URLA = "antecedents/";
const addAntecedent = (
  personal,
  familial,
  cardiovascularRiskFactors,
  patientId
) => {
  return axiosInstance.post(API_URLA + "patient/" + patientId, {
    personal,
    familial,
    cardiovascularRiskFactors,
  });
};

const getAllAntecedentsByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLA + "medical-dossier/" + medicalDossierId);
};

const API_URLEcg = "ecgs/";
const addEcg = (formData, patientId) => {
  return axiosInstance.post(API_URLEcg + "patient/" + patientId, formData);
};

const getAllEcgsByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLEcg + "medical-dossier/" + medicalDossierId);
};

const API_URLExp = "explorations/";
const addExploration = (formData, patientId) => {
  return axiosInstance.post(API_URLExp + "patient/" + patientId, formData);
};

const getAllExpRTByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLExp + "rt/" + medicalDossierId);
};

const getAllExpEchoByMedicalDossierId = (medicalDossierId) => {
  return axiosInstance.get(API_URLExp + "echo/" + medicalDossierId);
};

const API_URLMD = "medical-dossiers/";

const patchMedicalDossier = (
  hospitalization,
  historyDisease,
  primaryConclusion,
  conclusion,
  patientId
) => {
  return axiosInstance.put(API_URLMD + "patient/" + patientId, {
    hospitalization,
    historyDisease,
    primaryConclusion,
    conclusion,
  });
};

const getMedicalDossierByPatientId = (patientId) => {
  return axiosInstance.get(API_URLMD + "patient/" + patientId);
};

const archiveMedicalDossier = (dossierId) => {
  return axiosInstance.post(`${API_URLMD}${dossierId}/archive`);
};

const unarchiveMedicalDossier = (dossierId) => {
  return axiosInstance.post(`${API_URLMD}${dossierId}/unarchive`);
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
  archiveMedicalDossier,
  unarchiveMedicalDossier,
};

export default MedicalService;
