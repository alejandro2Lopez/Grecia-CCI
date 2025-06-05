// auth/authReducer.js
export const initialState = {
    session: null,
    loading: true,
  };
  
  export function authReducer(state, action) {
    switch (action.type) {
      case 'SET_SESSION':
        return { ...state, session: action.payload, loading: false };
      case 'CLEAR_SESSION':
        return { ...state, session: null, loading: false };
      case 'LOADING':
        return { ...state, loading: true };
      default:
        return state;
    }
  }
  