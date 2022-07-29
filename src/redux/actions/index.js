export const USER_INFO = 'USER_INFO';

export const userInfo = (email, password) => ({
  type: USER_INFO,
  payload: {
    email,
    password,
  },
});
