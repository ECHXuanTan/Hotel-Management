import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data from service", data);
  return axios.post("api/create-new-user", data);
};

const deleteUserService = (userId) => {
  console.log("check id to delete user", userId);
  return axios.delete("api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`api/allcode?type=${inputType}`);
};

const getTopRoomHomeService = (limit) => {
  return axios.get(`api/top-room-home?limit=${limit}`);
};

const getAllRooms = () => {
  return axios.get(`api/get-all-rooms`);
};

const saveDetailRoomService = (data) => {
  return axios.post("api/save-info-rooms", data);
};

const getDetailInforRooms = (inputId) => {
  return axios.get(`api/get-detail-room-by-id?id=${inputId}`);
};

const saveBulkScheduleRoom = (data) => {
  return axios.post("api/bulk-create-schedule", data);
};

const getScheduleRoomByDate = (roomId, data) => {
  return axios.get(
    `api/get-schedule-room-by-date?roomId=${roomId}&date=${data}`
  );
};
const getExtaInforRoomById = (roomId) => {
  return axios.get(`api/get-extra-infor-room-by-id?roomId=${roomId}`);
};

const getProfileRoomById = (roomId) => {
  return axios.get(`api/get-profile-room-by-id?roomId=${roomId}`);
};

const postCustomerBookAppointment = (data) => {
  return axios.post("api/customer-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("api/get-specialty");
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewHotel = (data) => {
  return axios.post("api/create-new-hotel", data);
};

const getAllHotel = () => {
  return axios.get("api/get-hotel");
};

const getAllDetailHotelById = (data) => {
  return axios.get(`api/get-detail-hotel-by-id?id=${data.id}`);
};

const getAllCustomerForRoom = (data) => {
  return axios.get(
    `api/get-list-customer-for-room?roomId=${data.roomId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("api/send-remedy", data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopRoomHomeService,
  getAllRooms,
  saveDetailRoomService,
  getDetailInforRooms,
  saveBulkScheduleRoom,
  getScheduleRoomByDate,
  getExtaInforRoomById,
  getProfileRoomById,
  postCustomerBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewHotel,
  getAllHotel,
  getAllDetailHotelById,
  getAllCustomerForRoom,
  postSendRemedy,
};
