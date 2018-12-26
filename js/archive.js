'use strict';

const t = TrelloPowerUp.iframe({
  appKey: window.appKey,
  appName: window.appName
});
const Promise = TrelloPowerUp.Promise;

const archiveAction = 'Archive Selected';
const undoAction = 'Undo Selected';

const submitButton = window.archiveSubmit;

const clear = function () {
  const uiList = window.archivalList;
  uiList.innerHTML = '';
  return uiList;
};

const archiveSelectedLists = function (token, close) {
  const checkboxes = window.archivalList.getElementsByClassName('list-item');
  const requests = [];
  for (const i in checkboxes) {
    if (checkboxes[i].checked) {
      const request = new XMLHttpRequest();
      request.open('PUT', `https://api.trello.com/1/lists/${checkboxes[i].value}/closed?value=${!!close}&key=${window.appKey}&token=${token}`, true);
      requests.push(new Promise((resolve, reject) => {
        request.onload = () => request.status === 200 ? resolve() : reject(request.status);
        request.onerror = reject;
        request.send();
      }));
    }
  }
  return requests;
};

const showList = function () {
  submitButton.innerHTML = archiveAction;
  window.notFound.setAttribute('hidden', '');
  window.archive.removeAttribute('hidden');
};

const showNotFound = function () {
  window.archive.setAttribute('hidden', '');
  window.notFound.removeAttribute('hidden');
};

const getAction = function () {
  return submitButton.innerHTML === archiveAction;
};

const toggleAction = function () {
  submitButton.innerHTML = getAction() ? undoAction : archiveAction;
};

// search action
window.search.addEventListener('submit', (event) => {
  event.preventDefault();

  const q = window.search.listName.value.trim();
  return t.lists('all')
    .then((lists) => {
      const uiList = clear();
      const re = new RegExp(q);
      let found = false;
      for (const l in lists) {
        if (re.test(lists[l].name)) {
          uiList.insertAdjacentHTML(
            'beforeend',
            `<label for="i${lists[l].id}"><input type="checkbox" id="i${lists[l].id}" class="list-item" value="${lists[l].id}" checked />${lists[l].name}</label>`
          );
          found = true;
        }
      }
      return found;
    })
    .then((any) => any ? showList() : showNotFound())
    .then(() => t.sizeTo('#content'));
});

// archive/undo action
window.archive.addEventListener('submit', (event) => {
  event.preventDefault();

  submitButton.setAttribute('disabled', '');
  Promise.resolve()
    .then(() => t.getRestApi().getToken())
    .then((token) => Promise.all(archiveSelectedLists(token, getAction())))
    .catch(() => t.popup({
      title: 'Oops',
      url: './error.html',
      height: 70
    }))
    .then(toggleAction)
    .then(() => submitButton.removeAttribute('disabled'));
});

// handle ESC for convenience
window.archive.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    t.closePopup();
  }
});

t.sizeTo('#content').done();
