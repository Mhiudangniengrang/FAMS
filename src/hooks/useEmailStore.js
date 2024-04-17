/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
import { create } from "zustand";
import { notification } from "antd";
import {
  getEmailTemplate,
  updateEmailTemplate,
  createEmailTemplate,
  sendRemindEmai,
  getUser,
  sendEmailTrainers,
  getEmailTemplateDetail,
  getActivilLogs,
} from "@/api/emailApi";
import { t } from "i18next";

const useEmailStore = create((set) => ({
  emailData: [],
  isLoadingEmail: false,
  fetchData: async () => {
    let page = 1;
    let emailData = [];
    try {
      set({ isLoadingEmail: true });
      while (true) {
        const response = await getEmailTemplate(page);
        if (response.status === 200) {
          const sortedEmailData =
            response?.data?.content.sort(
              (a, b) => b.templateId - a.templateId
            ) || [];
          emailData = [...emailData, ...sortedEmailData];
          if (page >= response.data.totalPages) {
            break;
          }
          page++;
        } else {
          break;
        }
      }
      set({ emailData: emailData });
      set({ isLoadingEmail: false });
    } catch (error) {
      set({ isLoadingEmail: false });
      console.error(">>> Error fetching", error);
    }
  },

  isLoadingActivitylogs: false,
  activitilogsData: [],
  fetchActivitilogs: async () => {
    let page = 1;
    let activitilogsData = [];
    try {
      set({ isLoadingActivitylogs: true });
      while (true) {
        const response = await getActivilLogs(page);
        if (response.status === 200) {
          activitilogsData = [
            ...activitilogsData,
            ...(response?.data?.content || []),
          ];
          if (page >= response.data.totalPages) {
            break;
          }
          page++;
        } else {
          break;
        }
      }
      set({ activitilogsData: activitilogsData });
      set({ isLoadingActivitylogs: false });
    } catch (error) {
      set({ isLoadingActivitylogs: false });
      console.error("Error fetching data:", error);
    }
  },

  updateEmailTemplate: async (modalData, t) => {
    try {
      const response = await updateEmailTemplate(modalData);
      if (response.status === 200) {
        notification.success({
          message: t("Updated successfully!"),
          description: t("Email updated successfully"),
        });
        return response.data;
      } else {
        notification.error({
          message: t("Error"),
          description: t("Failed to update!"),
        });
      }
    } catch (error) {
      console.error(">>> Error updating", error);
      notification.error({
        message: t("Failed to update!"),
        description: t("Please fill in all required fields!"),
      });
    }
  },

  createEmailTemplate: async (values, t) => {
    try {
      const response = await createEmailTemplate(values);
      if (response.status === 200) {
        notification.success({
          message: t("Created successfully!"),
          description: t("Email created successfully!"),
        });
        return response.data;
      } else {
        notification.error({
          message: t("Error"),
          description: t("Failed to create email!"),
        });
      }
    } catch (error) {
      console.error(">>> Error creating", error);
      notification.error({
        message: t("Error"),
        description: t("Failed to create email!"),
      });
    }
  },

  emailTempleteData: [],
  fetchEmailDetail: async (templateId) => {
    try {
      const response = await getEmailTemplateDetail(templateId);
      if (response && response.status === 200) {
        set({ emailTempleteData: response.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  getUser: async () => {
    let page = 1;
    let users = [];
    while (true) {
      try {
        const response = await getUser(page);
        if (response.status === 200) {
          users = [...users, ...response.data.content];
          if (page >= response.data.totalPages) {
            break;
          }
          page++;
        }
      } catch (error) {
        console.error(">>> Error fetching", error);
        break;
      }
    }
    return users;
  },

  sendRemindEmai: async (templateId, id, formData) => {
    try {
      const response = await sendRemindEmai(templateId, id, formData, t);
      if (response && response.status === 200) {
        notification.success({
          message: t("Send mail Successful"),
          description: t(response.data.message),
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: t("Send mail Failed"),
        description: t(error.response.data.message),
        duration: 2,
      });
    }
  },

  sendEmailtoTrainers: async (to, templateId, t) => {
    try {
      set({ isLoadingEmail: true });
      const res = await sendEmailTrainers(to, templateId);
      if (res && res.status === 200) {
        notification.success({
          message: t("Success!"),
          description: t("Email sent successfully!"),
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to send email.",
        });
      }
      set({ isLoadingEmail: false });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to send email.",
      });
      set({ isLoadingEmail: false });
    }
  },
}));

export default useEmailStore;
