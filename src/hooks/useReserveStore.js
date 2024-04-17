import { getReserveDetail } from "@/api/reserveApi/";
import { getListNewClassReserve } from "@/api/reserveApi/";
import { create } from "zustand";
import { getAllReserve } from "@/api/reserveApi";
const useStore = create((set) => ({
  reserveData: [],
  reserveDataDetail: [],
  ReserveTotalElement: "",
  newclassreserveData: [],
  addNewReserve: [],
  isLoadingReserveData: false,
  fetchReserveData: async (page) => {
    try {
      set({ isLoadingReserveData: true });
      const response = await getAllReserve(page);
      if (response && response.status === 200) {
        set({ reserveData: response?.data?.content || [] });
        set({ ReserveTotalElement: response?.data?.totalElements || "" });
      }
      set({ isLoadingReserveData: false });
    } catch (error) {
      set({ isLoadingReserveData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchNewClassReserve: async (reservedclassId) => {
    try {
      const response = await getListNewClassReserve(reservedclassId);
      if (response && response.status === 200) {
        set({ newclassreserveData: response.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchReserveDataDetail: async (reservedclassId) => {
    try {
      const response = await getReserveDetail(reservedclassId);
      if (response && response.status === 200) {
        set({ reserveDataDetail: response.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchReserveAdd: async (studentId, classId, startDate, endDate, reason) => {
    try {
      const response = await getReserveDetail(
        studentId,
        classId,
        startDate,
        endDate,
        reason
      );
      if (response && response.status === 200) {
        set({ reserveDataDetail: response.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
export default useStore;
