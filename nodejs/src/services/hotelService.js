const db = require("../models");

let createHotel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        await db.Hotel.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.descriptionHTML,
        });
        resolve({
          errCode: 0,
          errMessage: "Create hotel success",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllHotel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Hotel.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image =  Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Get all hotel success",
        data: data,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getAllDetailHotelById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let data = await db.Hotel.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionMarkdown",
            "descriptionHTML",
          ],
        });
        if (data) {
          let roomHotel = [];
          roomHotel = await db.Room_Infor.findAll({
            where: { hotelId: inputId },
            attributes: ["roomId", "provinceId"],
          });
          data.roomHotel = roomHotel;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "Get detail hotel success",
          data: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createHotel,
  getAllHotel,
  getAllDetailHotelById,
};
