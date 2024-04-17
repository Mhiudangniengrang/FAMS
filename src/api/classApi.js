import axiosClient from "@/config/axiosClient";

const getAllClass = (page) => {
  return axiosClient.get(`/v1/class-management`, {
    params: {
      page: page,
      size: 10,
    },
  });
};

const getClassDetail = (classId) => {
  return axiosClient.get(`/v1/class-management/class/${classId}`);
};
const getClassByStudent = (studentId,page) => {
  return axiosClient.get(`/v1/class-management/class-studentId/${studentId}`,{
    params: {
      page: page,
      size: 10,
    }, 
  });
};
export { getAllClass, getClassDetail,getClassByStudent };
