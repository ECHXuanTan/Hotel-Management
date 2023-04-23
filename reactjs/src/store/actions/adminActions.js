import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  editUserService,
  deleteUserService,
  getAllUsers,
  getTopRoomHomeService,
  getAllRooms,
  saveDetailRoomService,
  getAllSpecialty,
  getAllHotel,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create new user success");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("createNewUser error", e);
    }
  };
};

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users failed");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users failed");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error", e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user success");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user failed");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete user failed");
      dispatch(deleteUserFailed());
      console.log("deleteAUser error", e);
    }
  };
};

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit user success");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Edit user failed");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Edit user failed");
      dispatch(editUserFailed());
      console.log("editAUser error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const saveUserSuccess = (userData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: userData,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchTopRooms = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopRoomHomeService("");
      console.log("check res room", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_ROOMS_SUCCESS,
          dataRooms: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_ROOMS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_ROOMS_FAILED,
      });
      console.log("fetchTopRooms error", e);
    }
  };
};

export const fetchAllRooms = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllRooms();
      console.log("check res ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_ROOMS_SUCCESS,
          dataR: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_ROOMS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_ROOMS_FAILED,
      });
      console.log("fetchAllRooms error", e);
    }
  };
};

export const saveDetailRoom = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailRoomService(data);

      if (res && res.errCode === 0) {
        toast.success("Save information success");
        dispatch({
          type: actionTypes.SAVE_DETAIL_ROOM_SUCCESS,
        });
      } else {
        console.log("check res ", res);
        toast.error("Save information room failed");
        dispatch({
          type: actionTypes.SAVE_DETAIL_ROOM_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save information room failed");
      dispatch({
        type: actionTypes.SAVE_DETAIL_ROOM_FAILED,
      });
      console.log("saveDetailRoom error", e);
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("Err", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredRoomInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resHotel = await getAllHotel();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resHotel &&
        resHotel.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resHotel: resHotel.data,
        };
        dispatch(fetchRequiredRoomInforSuccess(data));
      } else {
        dispatch(fetchRequiredRoomInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredRoomInforFailed());
      console.log("getRequiredRoomInfor error", e);
    }
  };
};
export const fetchRequiredRoomInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredRoomInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_FAILED,
});
