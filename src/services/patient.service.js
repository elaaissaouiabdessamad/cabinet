import axios from "axios";

const API_URL = "http://localhost:3000/api/patients/";

const addPatient = (patientData) => {
  return axios.post(API_URL + "add", patientData);
};

const updatePatient = (patientId, formData) => {
  return axios.put(API_URL + patientId, formData);
};

const getPatientById = (patientId) => {
  return axios.get(API_URL + patientId);
};

const getPatientWithoutBed = () => {
  return axios.get(API_URL + "without-bed");
};

const API_URLAllget = "http://localhost:3000/api/patients";

const getAllPatients = () => {
  return axios.get(API_URLAllget);
};

const deletePatient = (patientId) => {
  return axios.delete(API_URL + patientId);
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
