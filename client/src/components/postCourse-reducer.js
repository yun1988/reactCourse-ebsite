export const postCourseReducer = (state, action) => {
  if (action.type === 'POSTCOURSE') {
    return {
      ...state
    };
  }
  if (action.type === 'CHANGE_ITEM') {
    return { ...state, [action.changeValue.name]: action.changeValue.value};
  }
  throw new Error('no matching action type');
};
