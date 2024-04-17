import { getScoreByClass } from "@/api/scoreApi";
import { importScoreData } from "@/api/scoreApi";
import { create } from "zustand";
import { notification } from "antd";
import { updateStudentScore } from "@/api/scoreApi";
import { getStudentScoreDetail } from "@/api/scoreApi";
import { downloadScoreTemplate } from "@/api/scoreApi";
import {t} from "i18next";

const useScoreStore = create((set) => ({
  scoreData: [],
  isLoadingScoreData: false,
  fetchScoreData: async (classId, page) => {
    try {
      set({ isLoadingScoreData: true });
      set({ scoreData: [] });
      const response = await getScoreByClass(classId, page);
      if (response && response.status === 200) {
        set({ scoreData: response?.data || [] });
      }
      set({ isLoadingScoreData: false });
      return response;
    } catch (error) {
      set({ isLoadingScoreData: false });
      console.error("check error", error);
    }
  },

  importScoreData: async (classId, option, formData) => {
    try {
      const response = await importScoreData(classId, option, formData);
      if (response && response.status === 200) {
        notification.success({
          message: t("Import Successful"),
          description: t(response.data.message),
          duration: 2,
        });
        return response;
      } else {
        notification.error({
          message: t("Import Failed"),
          description: t("Failed to import data"),
          duration: 2,
        });
      }
    } catch (err) {
      notification.error({
        message: t("Import Failed"),
        description: t(err.response.data.message),
        duration: 2,
      });
    }
  },

  downloadScoreTemplate: async () => {
    try {
      const response = await downloadScoreTemplate();
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "score_template.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link when done
      } else {
        console.error("Error: Unable to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  },

  updateStudentScore: async (classId, id, formData) => {
    try {
      const response = await updateStudentScore(classId, id, formData);
      if (response && response.status === 200) {
        notification.success({
          message: t("Update Successful"),
          description: t("Updated score successful."),
          duration: 2,
        });
      }
      return response;
    } catch (err) {
      console.error("err", err);
      notification.error({
        message: t("Update Failed"),
        description: t(`${err.response.data.message}`),
        duration: 2,
      });
    }
  },

  studentScoreData: [],
  isLoadingStudentScoreData: false,
  fetchStudentScoreDetail: async (classId, id) => {
    try {
      set({ isLoadingStudentScoreData: true });
      const response = await getStudentScoreDetail(classId, id);
      if (response && response.status === 200) {
        set({ studentScoreData: response?.data || [] });
      }
      set({ isLoadingStudentScoreData: false });
    } catch (error) {
      set({ isLoadingStudentScoreData: false });
      console.error("Error fetching data:", error);
    }
  },
}));

export default useScoreStore;
