import axios from "axios";

const API_URL = "http://localhost:3000/api/patients/";

const addPatient = (patientData) => {
  return axios.post(API_URL + "add", patientData);
};

const getPatientById = (patientId) => {
  return axios.get(API_URL + patientId);
};

const getPatientWithoutBed = () => {
  return axios.get(API_URL + "without-bed");
};

const PatientService = {
  addPatient,
  getPatientById,
  getPatientWithoutBed,
};

export default PatientService;
