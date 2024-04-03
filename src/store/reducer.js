import {
    LOGIN,
    SIGNOUT,
  } from './constants';
  
  const initialState = {
    userId: '',
    isLoggedIn: false,
    
  };
  export const inKartReducer = (state = initialState, action) => {
    // console.warn(action);
  
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          userId: action.payload.userId,
          isLoggedIn: true,
         
        };
      case SIGNOUT:
        return {
          ...state,
          userId: '',
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  