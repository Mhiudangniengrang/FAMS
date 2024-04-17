import axiosClient from "@/config/axiosClient";

const getEmailTemplate = (page) => {
  return axiosClient.get(`/v1/email-template-management/email-template?page=${page}&size=10000`);
};

const getActivilLogs = (page) => {
  return axiosClient.get(`/v1/email-send-management/email-send?page=${page}&size=10000`);
};

const getUser = (page) => {
  return axiosClient.get(`/v1/user-management/users?page=${page}&size=10000`);
};

const createEmailTemplate = (values) => {
  return axiosClient.post("/v1/email-template-management/email-template", values);
};

const updateEmailTemplate = (values) => {
  return axiosClient.put("/v1/email-template-management/email-template", values);
};

const sendRemindEmai = (id, templateId, formData) => {
  return axiosClient.post(`/v1/email-send-management/email-send/reservation-email ?reservedClassId=${id}&templateId=${templateId}`, formData);
}

const sendEmailTrainers = (to, emailTemplateId) => {
  let url = "/v1/email-send-management/email-send/send-trainer?emailTemplateId=" + emailTemplateId;
  to.forEach(userId => {
    url += "&to=" + userId;
  });
  return axiosClient.post(url);
};
const getEmailTemplateDetail = (templateId) => {
  return axiosClient.get(`/v1/email-template-management/email-template/${templateId}`);
};

export { getEmailTemplate, createEmailTemplate, updateEmailTemplate, sendRemindEmai, getUser, sendEmailTrainers, getEmailTemplateDetail, getActivilLogs };