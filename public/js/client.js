let Promise = TrelloPowerUp.Promise;

const WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';
const apiKey = '0eb914269291ac0b20cc7660eb557de8';

let checkAuthorization = (t) => {
  return t.get('member', 'private', 'token')
    .then((token) => ({ authorized: !!token, token: token }));
};

let promptAuthorization = (t) => {
  if (apiKey) {
    return t.popup({
      title: 'Authorize',
      args: { apiKey: apiKey },
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
        return checkAuthorization(t).then((status) => {
          if (status && status.authorized) {
            return t.popup({
              title: 'Archive Lists',
              url: 'archive.html',
              args: { apiKey: apiKey, token: status.token },
              height: 134
            });
          } else {
            return promptAuthorization(t);
          }
        });
      }
    }];
  },

  'authorization-status': checkAuthorization,
  'show-authorization': promptAuthorization
});
