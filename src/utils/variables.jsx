import React from 'react';

export const colors = {
  monzo_navy: '#14233c',
  monzo_red: '#e34b5f',
  monzo_yellow: '#e7ce9c',
  monzo_green: '#97baa6',
  monzo_blue: '#1e7889',
  hot_coral: '',
  btn_primary_color: '#00a0d6',
  btn_primary_bgcolor: '#00a0d61a',
};

export const logo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="311" height="69">
    <g>
      <path
        fill="#e34b5f"
        d="M76 50a4 4 0 0 1-1 2L59 68a1 1 0 0 1-2-1V32l19-19z"
      />
      <path fill="#e7ce9c" d="M63 0a1 1 0 0 0-2 0L38 24v27l19-19 19-19z" />
      <path
        fill="#1e7889"
        d="M0 50a4 4 0 0 0 1 2l16 16a1 1 0 0 0 2-1V32L0 13z"
      />
      <path fill="#97baa6" d="M15 0a1 1 0 0 0-2 0L0 13l19 19 19 19V24z" />
      <path
        fill="#fff"
        d="M100 50V15h9v4a10 10 0 0 1 10-5 11 11 0 0 1 9 6c4-4 7-6 11-6 8 0 13 4 13 13v23h-10V31c0-5-1-7-5-7s-6 2-6 7v19h-11V31c0-5-1-7-4-7s-6 2-6 7v19zm64-31a19 19 0 0 1 32 13 18 18 0 0 1-5 13 18 18 0 0 1-14 6 17 17 0 0 1-13-6 18 18 0 0 1-5-13 18 18 0 0 1 5-13zm13 22a9 9 0 0 0 9-9 8 8 0 1 0-17 0 9 9 0 0 0 40 9zm26 9V15h10v4c2-3 5-5 10-5 7 0 12 5 12 13v23h-10V31c0-5-1-7-5-7s-7 2-7 7v19zm76-31a19 19 0 0 1 32 13 18 18 0 0 1-5 13 18 18 0 0 1-13 6 17 17 0 0 1-14-6 18 18 0 0 1-5-13 18 18 0 0 1 5-13zm14 22a9 9 0 0 0 8-9 8 8 0 1 0-17 0 9 9 0 0 0 9 9zm-50 9v-7l14-19h-14v-9h26v8l-13 18h13v9z"
      />
    </g>
  </svg>
);

export const API_URL = 'https://guarded-thicket-22918.herokuapp.com';
export const USER_AUTH_COOKIE = 'user_auth';
