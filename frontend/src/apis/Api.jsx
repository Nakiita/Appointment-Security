import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Creating  test
export const testApi = () => Api.get("/test");
//  Creating register api
export const registerApi = (data) => Api.post("/api/user/register", data);

// Create login api
export const loginApi = (data) => Api.post("/api/user/login", data);
//forgot password
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot/password", data);

//reset password
export const resetPasswordApi = (data, token) =>
  Api.post(`/api/user/password/reset/${token}`, data);

export const getAllUsersApi = () => Api.get("/api/user/getUsers");

export const getPagination = (currentPage) =>
  Api.get(`/api/user/getPagination?page=${currentPage}`);

export const getSingleUserApi = (id) => Api.get(`/api/user/getUser/${id}`, config);

export const updateUserApi = (id, formData) =>
  Api.put(`/api/user/update_user/${id}`, formData, config);

export const deleteUserApi = (id) =>
  Api.delete(`/api/user/deleteUser/${id}`, config);

// Create doctor api
export const createDoctorApi = (formData) =>
  Api.post("/api/doctor/create_doctor", formData, config);

//  Get doctor api
export const getAllDoctorsApi = () => Api.get("/api/doctor/get_doctors");

// Get single doctor api
export const getSingleDoctorApi = (id) =>
  Api.get(`/api/doctor/get_doctor/${id}`);

//update doctor
export const updateDoctorApi = (id, formData) =>
  Api.put(`/api/doctor/update_doctor/${id}`, formData, config);

//delete doctor
export const deleteDoctorApi = (id) =>
  Api.delete(`/api/doctor/delete_doctor/${id}`, config);

export const getPaginationApi = (currentPage) =>
  Api.get(`/api/doctor/getPagination?page=${currentPage}`);

// Book Appointment
export const bookappointmentApi = (data) =>
  Api.post(`api/appointment/bookappointment`, data);

export const getAppointments = () => Api.get("/api/appointment/getappointment");

export const deleteAppointmentApi = (id) =>
  Api.delete(`/api/appointment/deleteAppointment/${id}`, config);

export const getPaginationAppointmentApi = (currentPage) =>
  Api.get(`/api/appointment/getPagination?page=${currentPage}`);

export const logoutApi = () => {
  return Api.post('/api/user/logout', {}, { withCredentials: true });
};

// Example API call to check if the session is still valid
export const checkSessionApi = () => {
  return Api.get('/api/user/check-session', { withCredentials: true });
};

export const getAllLogsApi = () => {
  return Api.get("/api/logs");
};

export const getSingleLogApi = (id) => {
  return Api.get(`/api/logs/${id}`);
};

export const deleteLogApi = (id) => {
  return Api.delete(`/api/logs/${id}`);
};
