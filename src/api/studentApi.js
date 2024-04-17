import axiosClient from "@/config/axiosClient";

const getAllStudent = ({ page }) => {
  return axiosClient.get(`/v1/student-management/students`, {
    params: {
      page: page,
      size: 10,
    },
  });
};
const getStudentByCode = (studentCode) => {
  return axiosClient.get(`/v1/student-management/student-code/${studentCode}`);
};

const getStudentDetail = (id) => {
  return axiosClient.get(`/v1/student-management/student-id/${id}`);
};

const editStudentCertification = (studentClassId) => {
  return axiosClient.put(
    `api/v1/student-management/EditCertificationStatus`,
    studentClassId
  );
};

const deleteStudent = (id) => {
  return axiosClient.delete(`/v1/student-management/student/${id}`);
};

const importStudent = (file, classCode) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post(`/v1/student-management/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      classCode: classCode,
    },
  });
};

const classInformation = (id) => {
  return axiosClient.get(`/v1/class-management/class-studentId/${id}`, {
    params: {
      studentId: id,
      page: 1,
      size: 10,
    },
  });
};

const editStudent = (student) => {
  return axiosClient.put(`/v1/student-management/student`, student);
};

const addStudent = ({ classCode, body }) => {
  return axiosClient.post(
    `/v1/student-management/student${
      classCode ? `?classCode=${classCode}` : ""
    }`,
    body
  );
};

const getStudentByClass = (classId, page) => {
  return axiosClient.get(`/v1/student-management/${classId}`, {
    params: {
      page: page,
      size: 10,
    },
  });
};

const editStatusStudent = (classId, attendingStatus, studentIds) => {
  return axiosClient.put(
    `/v1/student-class-management/student-class?classId=${classId}&attendingStatus=${attendingStatus}`,
    studentIds
  );
};

const removeStudentInClass = (studentId, classId) => {
  return axiosClient.delete(
    `v1/student-class-management/student-class?studentId=${studentId}&classId=${classId}`
  );
};
const editCertificateStatus = (studentInfo) => {
  return axiosClient.put(
    "/v1/student-management/EditCertificationStatus",
    studentInfo
  );
};

export {
  getAllStudent,
  getStudentDetail,
  deleteStudent,
  removeStudentInClass,
  importStudent,
  editStudent,
  addStudent,
  classInformation,
  editStudentCertification,
  getStudentByClass,
  editStatusStudent,
  editCertificateStatus,
  getStudentByCode
};
