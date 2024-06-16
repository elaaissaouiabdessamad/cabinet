import axiosInstance from "./axiosInstance";

const API_URL = "beds/";

const addBedBySectorId = (sectorId) => {
  return axiosInstance.post(API_URL + "add/" + sectorId);
};

const getBedsBySectorId = (sectorId) => {
  return axiosInstance.get(API_URL + "sector/" + sectorId);
};

const getBedById = (bedId) => {
  return axiosInstance.get(API_URL + bedId);
};

const getBedByPatientId = (patientId) => {
  return axiosInstance.get(API_URL + "patient/" + patientId);
};

const assignPatientToBed = (bedId, patientId) => {
  return axiosInstance.post(
    API_URL + "assign/bed/" + bedId + "/patient/" + patientId
  );
};

const removePatientToBed = (bedId) => {
  return axiosInstance.post(API_URL + "remove/" + bedId);
};

const deleteBedById = (bedId) => {
  return axiosInstance.delete(API_URL + "delete/" + bedId);
};

const BedService = {
  addBedBySectorId,
  assignPatientToBed,
  removePatientToBed,
  getBedsBySectorId,
  getBedById,
  getBedByPatientId,
  deleteBedById,
};

export default BedService;
