import db from "../models/index";
require("dotenv").config();
import _, { isBuffer } from "lodash";
import emailService from "../services/emailService";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let checkRequiredField = (inputData) => {
  let arrFields = [
    "roomId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameHotel",
    "addressHotel",
    "note",
    "specialtyId",
  ];

  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};

let getTopRoomHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rooms = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          // {
          //   model: db.Allcode,
          //   as: "genderData",
          //   attributes: ["valueEn", "valueVi"],
          // },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: rooms,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRooms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let rooms = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        errCode: 0,
        data: rooms,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailInforRoom = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredField(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing paramater: ${checkObj.element}`,
        });
      } else {
        //upsert to Markdown
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            roomId: inputData.roomId,
          });
        } else if (inputData.action === "EDIT") {
          let roomMarkdown = await db.Markdown.findOne({
            where: { roomId: inputData.roomId },
            raw: false,
          });
          if (roomMarkdown) {
            roomMarkdown.contentHTML = inputData.contentHTML;
            roomMarkdown.contentMarkdown = inputData.contentMarkdown;
            roomMarkdown.description = inputData.description;
            roomMarkdown.updateAt = new Date();
            await roomMarkdown.save();
          }
        }

        //upsert to Room_infor table
        let roomInfor = await db.Room_Infor.findOne({
          where: { roomId: inputData.roomId },
          raw: false,
        });
        if (roomInfor) {
          //update
          roomInfor.roomId = inputData.roomId;
          roomInfor.priceId = inputData.selectedPrice;
          roomInfor.paymentId = inputData.selectedPayment;
          roomInfor.provinceId = inputData.selectedProvince;
          roomInfor.nameHotel = inputData.nameHotel;
          roomInfor.addressHotel = inputData.addressHotel;
          roomInfor.note = inputData.note;
          roomInfor.specialtyId = inputData.specialtyId;
          roomInfor.hotelId = inputData.hotelId;
          await roomInfor.save();
        } else {
          //create
          await db.Room_Infor.create({
            roomId: inputData.roomId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameHotel: inputData.nameHotel,
            addressHotel: inputData.addressHotel,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            hotelId: inputData.hotelId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save info success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailRoomById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          message: "Please input all field",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Room_Infor,
              attributes: {
                exclude: ["id", "roomId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.roomId || !data.formatedDate) {
        resolve({
          errCode: 1,
          message: "Please input all field",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        // console.log("check schedule", schedule);
        // await db.Schedule.bulkCreate(schedule);
        //get all existing data
        let existing = await db.Schedule.findAll({
          where: { roomId: data.roomId, date: data.formatedDate },
          attributes: ["timeType", "date", "roomId", "maxNumber"],
          raw: true,
        });

        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (roomId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!roomId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Please input all field",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            roomId: roomId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "roomData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) {
          dataSchedule = [];
        }
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getExtraInforRoomById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Please input all field",
        });
      } else {
        let data = await db.Room_Infor.findOne({
          where: {
            roomId: idInput,
          },
          attributes: {
            exclude: ["id", "roomId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
      console.log("error", e);
    }
  });
};

let getProfileRoomById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter....",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: idInput,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Room_Infor,
              attributes: {
                exclude: ["id", "roomId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListCustomerForRoom = (roomId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!roomId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter....",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            roomId: roomId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "customerData",
              attributes: ["email", "firstName", "address", "gender"],
              // include: [
              //   {
              //     model: db.Allcode,
              //     as: "genderData",
              //     attributes: ["valueEn", "valueVi"],
              //   },
              // ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataCustomer",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.roomId || !data.customerId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter....",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            roomId: data.roomId,
            customerId: data.customerId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }

        //send mail
        await emailService.sendAttachment(data);

        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopRoomHome: getTopRoomHome,
  getAllRooms: getAllRooms,
  saveDetailInforRoom: saveDetailInforRoom,
  getDetailRoomById: getDetailRoomById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforRoomById: getExtraInforRoomById,
  getProfileRoomById: getProfileRoomById,
  checkRequiredField: checkRequiredField,
  getListCustomerForRoom: getListCustomerForRoom,
  sendRemedy: sendRemedy,
};
