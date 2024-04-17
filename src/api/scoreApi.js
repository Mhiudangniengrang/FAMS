import axiosClient from "@/config/axiosClient";

const getScoreByClass = (classId, page) => {
  return axiosClient.get(
    `/v1/score-management/class-score/${classId}?page=${page}`,{
      params: {
        page: page,
        size: 10,
      },
    }
  );
};

const importScoreData = (classId, option, formData) => {
  return axiosClient.post(
    `/v1/score-management/import?classId=${classId}&option=${option}`,
    formData
  );
};

const downloadScoreTemplate = () => {
  return axiosClient.get("v1/score-management/template", {
    responseType: "blob",
  });
};

const getStudentScoreDetail = (classId, studentId) => {
  return axiosClient.get(
    `v1/score-management/student-score-in-class/?studentId=${studentId}&classId=${classId}`
  );
};

const updateStudentScore = (classId, id, formData) => {
  return axiosClient.put(
    `/v1/score-management/student-score?studentId=${id}&classId=${classId}`,
    formData
  );
};

export {
  getScoreByClass,
  importScoreData,
  updateStudentScore,
  getStudentScoreDetail,
  downloadScoreTemplate,
};
