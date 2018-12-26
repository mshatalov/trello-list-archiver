'use strict';

let promptAuthorization = (t) => {
  if (window.appKey) {
    return t.popup({
      title: 'Authorize',
      url: './authorize.html',
      height: 140
    });
  } else {
    console.log('🙈 Looks like you need to add your API key to the project!');
  }
};

TrelloPowerUp.initialize({
  'board-buttons': (t, options) => {
    return [{
      icon: {
        dark: document.getElementById('white-icon').href,
        light: document.getElementById('black-icon').href
      },
      text: 'Archive Lists',
      callback: (t) => {
        return t.getRestApi().isAuthorized().then((authorized) => {
          if (authorized) {
            return t.popup({
              title: 'Archive Lists',
              url: 'archive.html',
              height: 134
            });
          } else {
            return promptAuthorization(t);
          }
        });
      }
    }];
  },
  'authorization-status': (t) => t.getRestApi().isAuthorized().then((authorized) => ({ authorized })),
  'show-authorization': promptAuthorization
}, {
  appKey: window.appKey,
  appName: window.appName
});
