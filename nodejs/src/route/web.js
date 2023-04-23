import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import roomController from "../controllers/roomController";
import customerController from "../controllers/customerController";
import specialtyController from "../controllers/specialtyController";
import hotelController from "../controllers/hotelController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLoging);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-room-home", roomController.getTopRoomHome);
  router.get("/api/get-all-rooms", roomController.getAllRooms);
  router.post("/api/save-info-rooms", roomController.postInforRoom);
  router.get("/api/get-detail-room-by-id", roomController.getDetailRoomById);
  router.post("/api/bulk-create-schedule", roomController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-room-by-date",
    roomController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-room-by-id",
    roomController.getExtraInforRoomById
  );
  router.get("/api/get-profile-room-by-id", roomController.getProfileRoomById);
  router.get(
    "/api/get-list-customer-for-room",
    roomController.getListCustomerForRoom
  );
  router.post("/api/send-remedy", roomController.sendRemedy);

  router.post(
    "/api/customer-book-appointment",
    customerController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    customerController.postVerifyBookAppointment
  );

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  router.post("/api/create-new-hotel", hotelController.createHotel);
  router.get("/api/get-hotel", hotelController.getAllHotel);
  router.get("/api/get-detail-hotel-by-id", hotelController.getDetailHotelById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
