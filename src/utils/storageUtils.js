export const setCookie = (name, value, options) => {
  const cookie = `${name}=${value};path=/;${!options.secure ? '' : 'secure'};${
    options.expires
      ? `expires=${new Date(options.expires * 1000).toUTCString()};`
      : ''
  }`;
  console.log(options.expires);
  document.cookie = cookie;
};

export const getCookie = name => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : undefined;
};

export const USER_AUTH_COOKIE = 'user_auth';

export const isLoggedIn = () => getCookie(USER_AUTH_COOKIE);
