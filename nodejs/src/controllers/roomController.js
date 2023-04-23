import roomService from "../services/roomService";

let getTopRoomHome = async (req, res) => {
  let limit = req.query.limit || 10;
  // if (!limit) limit = 10;
  try {
    let response = await roomService.getTopRoomHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllRooms = async (req, res) => {
  try {
    let rooms = await roomService.getAllRooms();
    return res.status(200).json(rooms);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let postInforRoom = async (req, res) => {
  try {
    let response = await roomService.saveDetailInforRoom(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getDetailRoomById = async (req, res) => {
  try {
    let infor = await roomService.getDetailRoomById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let info = await roomService.bulkCreateSchedule(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let info = await roomService.getScheduleByDate(
      req.query.roomId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getExtraInforRoomById = async (req, res) => {
  try {
    let info = await roomService.getExtraInforRoomById(req.query.roomId);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getProfileRoomById = async (req, res) => {
  try {
    let info = await roomService.getProfileRoomById(req.query.roomId);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getListCustomerForRoom = async (req, res) => {
  try {
    let info = await roomService.getListCustomerForRoom(
      req.query.roomId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let info = await roomService.sendRemedy(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

module.exports = {
  getTopRoomHome: getTopRoomHome,
  getAllRooms: getAllRooms,
  postInforRoom: postInforRoom,
  getDetailRoomById: getDetailRoomById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforRoomById: getExtraInforRoomById,
  getProfileRoomById: getProfileRoomById,
  getListCustomerForRoom: getListCustomerForRoom,
  sendRemedy: sendRemedy,
};
