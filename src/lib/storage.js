const USER_KEY = 'auth_user';

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuth() {
  removeUser();
}

export function isAuthenticated() {
  return !!getUser();
}

const storage = {
  saveUser,
  getUser,
  removeUser,
  clearAuth,
  isAuthenticated,
};

export default storage;

