import { create } from "zustand";
import { getAllClass, getClassDetail } from "@/api/classApi";

const useClassStore = create((set) => ({
  classData: [],
  classTotalElements: "",
  isLoadingClassList: false,
  fetchClassData: async (page) => {
    try {
      set({ isLoadingClassList: true });
      const res = await getAllClass(page);
      if (res && res.status === 200) {
        set({ classData: res?.data?.content || [] });
        set({ classTotalElements: res?.data?.totalElements || "" });
      }
      set({ isLoadingClassList: false });
    } catch (err) {
      set({ isLoadingClassList: false });
      console.error("Error fetching data:", err);
    }
  },

  classDetailData: {},
  isLoading: false,
  fetchClassDetail: async (classId) => {
    try {
      set({ isLoading: true });
      const res = await getClassDetail(classId);
      if (res && res.status === 200) {
        set({ classDetailData: res?.data || {} });
      }
      set({ isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default useClassStore;
