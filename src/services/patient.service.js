import axiosInstance from "./axiosInstance";

const API_URL = "patients/";
const API_URLn = "patients";

const addPatient = (patientData) => {
  return axiosInstance.post(API_URL + "add", patientData);
};

const updatePatient = (patientId, formData) => {
  return axiosInstance.put(API_URL + patientId, formData);
};

const getPatientById = (patientId) => {
  return axiosInstance.get(API_URL + patientId);
};

const getPatientWithoutBed = () => {
  return axiosInstance.get(API_URL + "without-bed");
};

const getAllPatients = () => {
  return axiosInstance.get(API_URLn);
};

const deletePatient = (patientId) => {
  return axiosInstance.delete(API_URL + patientId);
};

const PatientService = {
  addPatient,
  getPatientById,
  getAllPatients,
  getPatientWithoutBed,
  updatePatient,
  deletePatient,
};

export default PatientService;
