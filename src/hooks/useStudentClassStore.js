import { create } from "zustand";
import { getStudentDetailByClass } from "@/api/studentClassApi";
import { updateAttendingStatus } from "../api/studentClassApi";

const useStudentClassStore = create((set) => ({
  isLoadingStudentDetailByClass: false,
  studentDetailByClass: {},
  fetchStudentDetailByClass: async (studentId, classId) => {
    try {
      set({ isLoadingStudentDetailByClass: true });
      const res = await getStudentDetailByClass(studentId, classId);
      if (res && res.status === 200) {
        set({ studentDetailByClass: res?.data || {} });
      }
      set({ isLoadingStudentDetailByClass: false });
    } catch (err) {
      set({ isLoadingStudentDetailByClass: false });
      console.error("Error fetching userInfo", err);
    }
  },

  updateStudentAttendingStatus: async (studentId, classId, attendingStatus) => {
    try {
      const res = await updateAttendingStatus(
        studentId,
        classId,
        attendingStatus
      );
      if (res && res.status === 200) {
        return res;
      }
    } catch (err) {
      console.error("Error Updating attending status", err);
    }
  },
}));

export default useStudentClassStore;
