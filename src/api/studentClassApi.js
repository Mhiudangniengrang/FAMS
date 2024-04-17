import axiosClient from "@/config/axiosClient";

const getStudentDetailByClass = (studentId, classId) => {
  return axiosClient.get(
    `/v1/student-class-management/student-class?studentId=${studentId}&classId=${classId}`
  );
};

const updateAttendingStatus = (studentId, classId, attendingStatus) => {
  return axiosClient.put(
    `/v1/student-class-management/student-class/${studentId}?classId=${classId}&attendingStatus=${attendingStatus}`
  );
};

export { getStudentDetailByClass, updateAttendingStatus };
