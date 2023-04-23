import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (roomId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&roomId=${roomId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        // !data.email ||
        !data.roomId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          customerName: data.fullName,
          time: data.timeString,
          roomName: data.roomName,
          language: data.language,
          redirectLink: buildUrlEmail(data.roomId, token),
        });

        //upsert data to database
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        });
        console.log("check user: ", user[0]);
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { customerId: user[0].id },
            defaults: {
              statusId: "S1",
              roomId: data.roomId,
              customerId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.roomId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            roomId: data.roomId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Booking has been activated or dose not exist",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
