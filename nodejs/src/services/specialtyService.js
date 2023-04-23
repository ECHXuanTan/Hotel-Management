const db = require("../models");

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Success",
        data,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let roomSpecialty = [];
          if (location === "ALL") {
            roomSpecialty = await db.Room_Infor.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ["roomId", "provinceId"],
            });
          } else {
            //find location
            roomSpecialty = await db.Room_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["roomId", "provinceId"],
            });
          }
          data.roomSpecialty = roomSpecialty;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "Success",
          data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
