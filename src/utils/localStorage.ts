export const setToLocalStorage = (key: string, token: string) => {
  console.log(token);
  // if (!key || typeof window === "undefined") {
  //   return "";
  // }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const removeFormLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};
