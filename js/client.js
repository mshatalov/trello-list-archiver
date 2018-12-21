'use strict';

const WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';

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
      icon: WHITE_ROCKET_ICON,
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
