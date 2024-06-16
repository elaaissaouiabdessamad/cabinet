import axiosInstance from "./axiosInstance";

class MedicineService {
  getMedicines() {
    return axiosInstance.get("medicines");
  }

  createMedicine(medicine) {
    return axiosInstance.post("medicines", medicine);
  }

  updateMedicine(id, medicine) {
    return axiosInstance.put(`medicines/${id}`, medicine);
  }

  deleteMedicine(id) {
    return axiosInstance.delete(`medicines/${id}`);
  }

  addQuantity(id, quantity) {
    return axiosInstance.patch(`medicines/${id}/add`, { quantity });
  }

  subtractQuantity(id, quantity) {
    return axiosInstance.patch(`medicines/${id}/subtract`, { quantity });
  }
}

export default new MedicineService();
