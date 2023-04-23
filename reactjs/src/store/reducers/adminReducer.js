import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topRooms: [],
  allRooms: [],
  allScheduleTime: [],
  allRequiredRoomInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      // console.log("fire fetch gender success", copyState);

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_ROOMS_SUCCESS:
      state.topRooms = action.dataRooms;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_ROOMS_FAILED:
      state.topRooms = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ROOMS_SUCCESS:
      state.allRooms = action.dataR;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ROOMS_FAILED:
      state.allRooms = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_ROOM_INFOR_SUCCESS:
      state.allRequiredRoomInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_ROOM_INFOR_FAILED:
      state.allRequiredRoomInfor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
