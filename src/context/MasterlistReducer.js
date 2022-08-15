export const GET_ITEMS = "GET_ITEMS";
export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const GET_OPTIONS = "GET_OPTIONS";
export const GET_ATTACHMENTS = "GET_ATTACHMENTS";
export const ADD_ATTACHMENT = "ADD_ATTACHMENT";
export const DELETE_ATTACHMENT = "DELETE_ATTACHMENT";

export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        itemList: payload.itemList,
      };
    case GET_OPTIONS:
      return {
        ...state,
        ...payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        itemList: [payload.newItem, ...state.itemList],
      };
    case EDIT_ITEM:
      return {
        ...state,
        itemList: [
          ...state.itemList.slice(
            0,
            state.itemList.findIndex((data) => data.id === payload.id)
          ),
          { ...payload.newItem },
          ...state.itemList.slice(
            state.itemList.findIndex((data) => data.id === payload.id) + 1
          ),
        ],
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((data) => data.id !== payload.id),
      };
    default:
      return state;
  }
};
