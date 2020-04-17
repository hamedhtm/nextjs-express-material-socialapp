import actionType from "../_type/user.type";

const initialState = { user: null, loading: false, error: "" };

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        user: action.user,
        loading: false,
      };
    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionType.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        user: null,
        loading: false,
      };
    case actionType.UPDATE_CURRENT_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default authentication;
