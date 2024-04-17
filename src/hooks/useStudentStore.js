import { create } from "zustand";
import {
  deleteStudent,
  importStudent,
  editStudent,
  addStudent,
  getStudentDetail,
  classInformation,
  editStatusStudent,
  removeStudentInClass,
  getStudentByClass,
  getAllStudent,
  editCertificateStatus,
} from "@/api/studentApi";
import { notification } from "antd";
import { t } from "i18next";
const useStudentStore = create((set) => ({
  isLoadingStudentData: false,
  studentData: [],
  studentDataFull: {},
  fetchStudentData: async ({ page }) => {
    try {
      set({ isLoadingStudentData: true });

      const response = await getAllStudent({ page });
      if (response && response.status === 200) {
        set({ studentData: response?.data?.content });
        set({ studentDataFull: response?.data });
      }
      set({ isLoadingStudentData: false });
    } catch (error) {
      set({ isLoadingStudentData: false });
      console.error("Error fetching data:", error);
    }
  },

  isLoadingStudentDetail: false,
  fetchStudentDataDetail: async (id) => {
    try {
      set({ isLoadingStudentDetail: true });
      const response = await getStudentDetail(id);
      if (response && response.status === 200) {
        set({ studentDataDetail: response?.data });
      }
      set({ isLoadingStudentDetail: false });
    } catch (error) {
      set({ isLoadingStudentDetail: false });
      console.error("Error fetching data:", error);
    }
  },

  fetchStudentDelete: async (id) => {
    try {
      const response = await deleteStudent(id, t);
      if (response && response.status === 200) {
        notification.success({
          message: t("Delete Successful"),
          description: t(response?.data?.message),
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: t("Failed to delete student"),
        description: t(error.response.data.message),
        duration: 2,
      });
      console.error("Error fetching data", error);
    }
  },

  studentDataDetail: [],
  fetchStudentEdit: async (student) => {
    try {
      const response = await editStudent(student, t);
      if (response.data.status === 200) {
        notification.success({
          message: t("Update Successful"),
          description: t("You have successfully edited student"),
          duration: 2,
        });
        return response;
      }
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({
        message: t("Update Failed"),
        description: t(error.response.data.message),
        duration: 2,
      });
    }
  },

  fetchStudentAdd: async ({ classCode, body }) => {
    try {
      const response = await addStudent({ classCode, body, t });
      if (response.data.status === 200) {
        notification.success({
          message: t("Success"),
          description: t("Data added successfully"),
        });
      } else {
        notification.error({
          message: "Error",
          description: response.data.message,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
      notification.error({
        message: t("Add Failed"),
        description: t(error.response.data.message),
        duration: 2,
      });
    }
  },
  fetchImportStudent: async (file, classCode) => {
    try {
      const response = await importStudent(file, classCode);
      if (response && response.status === 200) {
        notification.success({
          message: t("Import Successful"),
          description: t(response.data.message),
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: t("Import Failed"),
        description: t("Failed to import data"),
        duration: 2,
      });
    }
  },

  classStudentData: [],
  fetchClassInformation: async (id) => {
    try {
      const response = await classInformation(id);
      if (response && response.status === 200) {
        set({ classStudentData: response?.data?.content });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchStudentRemove: async (studentId, classId) => {
    try {
      const response = await removeStudentInClass(studentId, classId, t);
      if (response && response.status === 200) {
        notification.success({
          message: t("Remove Successful"),
          description: t(response?.data?.message),
          duration: 2,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: t("Failed to remove student"),
        description: t(error.response.data.message),
        duration: 2,
      });
    }
  },

  studentByClass: [],
  isLoadingStudentList: false,
  fetchStudentByClass: async (classId, page) => {
    try {
      set({ isLoadingStudentList: true });
      set({ studentByClass: [] });
      const res = await getStudentByClass(classId, page);
      if (res && res.status === 200) {
        set({ studentByClass: res?.data || [] });
      }
      set({ isLoadingStudentList: false });
      return res;
    } catch (err) {
      set({ isLoadingStudentList: false });
      console.error("Error fetching data:", err);
    }
  },

  fetchEditStatusStudent: async (classId, attendingStatus, studentIds) => {
    try {
      const response = await editStatusStudent(
        classId,
        attendingStatus,
        studentIds
      );
      if (response.status === 200) {
        notification.success({
          message: t(response?.data?.message),
          duration: 2,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: t(error.response.data.message),
        duration: 2,
      });
    }
  },

  fetchEditCertificate: async (studentInfo) => {
    try {
      const res = await editCertificateStatus(studentInfo);
      if (res && res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.error("err", err);
      return err;
    }
  },
}));

export default useStudentStore;
