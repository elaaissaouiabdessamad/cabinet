import axiosInstance from "./axiosInstance";

const API_URL_NURSES = "nurses";
const API_URL_NURSE_SHIFTS = "nurse-shifts";

const getAllNurses = () => {
  return axiosInstance.get(API_URL_NURSES);
};

const getNurseById = (id) => {
  return axiosInstance.get(`${API_URL_NURSES}/${id}`);
};

const createNurse = (nurse) => {
  return axiosInstance.post(API_URL_NURSES, nurse);
};

const updateNurse = (id, nurse) => {
  return axiosInstance.put(`${API_URL_NURSES}/${id}`, nurse);
};

const deleteNurse = (id) => {
  return axiosInstance.delete(`${API_URL_NURSES}/${id}`);
};

const getNurseShifts = (startDate, endDate, shiftType) => {
  return axiosInstance.get(`${API_URL_NURSE_SHIFTS}/guards`, {
    params: { startDate, endDate, shiftType },
  });
};

const generateShifts = (startDate, endDate) => {
  return axiosInstance.post(
    `${API_URL_NURSE_SHIFTS}/generate?startDate=${startDate}&endDate=${endDate}`
  );
};

const addShift = (date, shiftType, nurseId) => {
  return axiosInstance.post(
    `${API_URL_NURSE_SHIFTS}/date/${date}/shift-type/${shiftType}/nurse/${nurseId}`
  );
};

const updateShift = (shiftId, nurseId) => {
  return axiosInstance.put(
    `${API_URL_NURSE_SHIFTS}/${shiftId}/nurse/${nurseId}`
  );
};

const deleteShift = (shiftId) => {
  return axiosInstance.delete(`${API_URL_NURSE_SHIFTS}/${shiftId}`);
};

export default {
  getAllNurses,
  getNurseById,
  createNurse,
  updateNurse,
  deleteNurse,
  getNurseShifts,
  generateShifts,
  addShift,
  updateShift,
  deleteShift,
};
