import hotelService from "../services/hotelService.js";

let createHotel = async (req, res) => {
  try {
    let info = await hotelService.createHotel(req.body);
    res.status(201).json(info);
  } catch (err) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Create hotel failed",
    });
  }
};

let getAllHotel = async (req, res) => {
  try {
    let info = await hotelService.getAllHotel();
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Get all hotel failed",
    });
  }
};

let getDetailHotelById = async (req, res) => {
  try {
    let info = await hotelService.getAllDetailHotelById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Get detail hotel failed",
    });
  }
};

module.exports = {
  createHotel,
  getAllHotel,
  getDetailHotelById,
};
