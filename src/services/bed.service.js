import axios from "axios";

const API_URL = "http://localhost:3000/api/beds/";
const addBedBySectorId = (sectorId) => {
  return axios.post(API_URL + "add/" + sectorId);
};

const getBedsBySectorId = (sectorId) => {
  return axios.get(API_URL + "sector/" + sectorId);
};

const getBedById = (bedId) => {
  return axios.get(API_URL + bedId);
};

const assignPatientToBed = (bedId, patientId) => {
  return axios.post(API_URL + "assign/bed/" + bedId + "/patient/" + patientId);
};

const removePatientToBed = (bedId) => {
  return axios.post(API_URL + "remove/" + bedId);
};

const BedService = {
  addBedBySectorId,
  assignPatientToBed,
  removePatientToBed,
  getBedsBySectorId,
  getBedById,
};

export default BedService;
