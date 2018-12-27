'use strict';

const authPopup = {
  title: 'Authorize',
  url: './authorize.html',
  height: 140
};

const archivePopup = {
  title: 'Archive Lists',
  url: './archive.html',
  height: 119
};

TrelloPowerUp.initialize({
  'board-buttons': (t, opts) => {
    return [{
      icon: {
        dark: document.getElementById('white-icon').href,
        light: document.getElementById('black-icon').href
      },
      text: 'Archive Lists',
      callback: (t) => t.getRestApi()
        .isAuthorized()
        .then((auth) => t.popup(auth ? archivePopup : authPopup))
    }];
  },
  'authorization-status': (t) => t.getRestApi().isAuthorized().then((authorized) => ({ authorized })),
  'show-authorization': (t) => t.popup(authPopup)
}, {
  appKey: window.appKey,
  appName: window.appName
});
