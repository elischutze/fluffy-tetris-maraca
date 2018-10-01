export const setCookie = (name, value, options) => {
  document.cookie = `${name}=${value};${!options.secure ? '' : 'secure'};${
    options.expires
      ? `expires=${new Date(options.expires * 1000).toUTCString()};`
      : ''
  }`;
};

export const getCookie = name => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : undefined;
};
