const Storage = {
  set: (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },

  get: (key: string) => {
    return localStorage.getItem(key);
  },

  remove: (key: string) => {
    return localStorage.removeItem(key);
  },

  // Use this one wisely 😇
  removeAll: () => {
    return localStorage.clear();
  },
};

export default Storage;
