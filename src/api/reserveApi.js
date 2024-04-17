import axiosClient from "@/config/axiosClient";

const getAllReserve = (page) => {
  return axiosClient.get(`/v1/reserved-class-management/reserved-class`, {
    params: {
      page: page,
      size: 10,
    },
  });
};
const getReserveDetail = (reservedclassId) => {
  return axiosClient.get(`/v1/reserved-class-management/reserved-class/${reservedclassId}`);
};

const getBackToClass = (reservedclassId, studentId, classId) => {
  return axiosClient.post(`/v1/reserved-class-management/reserved-class/new-student-class?reservedClassId=${reservedclassId}&studentId=${studentId}&classId=${classId}`);
};

const getAddReserve = (studentId, classId, startDate, endDate, reason) => {
  return axiosClient.post('/v1/reserved-class-management/reserved-class', {
    studentId: studentId,
    classId: classId,
    startDate: startDate,
    endDate: endDate,
    reason: reason
  });
};

const getListNewClassReserve = (reservedclassId) => {
  return axiosClient.get(`/v1/reserved-class-management/reserved-class/new-class?reservedClassId=${reservedclassId}`);
};
const getDropOutClass = (reservedclassId) => {
  return axiosClient.put(`/v1/reserved-class-management/reserved-class?reservedClassId=${reservedclassId}`);
};
const getRemind = (reservedclassId) => {
  return axiosClient.post(`/v1/email-send-management/email-send/after-reservation?reservedClassId=${reservedclassId}`);
};



export { getAllReserve, getReserveDetail, getBackToClass, getListNewClassReserve, getAddReserve, getRemind, getDropOutClass };