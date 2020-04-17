import actionType from "../_type/user.type";

const registration = (state = {}, action) => {
  switch (action.type) {
    case actionType.REGISTER_REQUEST:
      return {
        loading: true,
      };
    case actionType.REGISTER_SUCCESS:
      return {
        loading: false,
      };
    case actionType.REGISTER_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default registration;
